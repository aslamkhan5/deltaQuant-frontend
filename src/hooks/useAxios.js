import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getFirstError } from '../configs/messageConfig';
import { toast } from 'react-toastify';

const createAxiosRequest = async (
  url,
  method,
  payload,
  authorizationToken,
  customHeaders,
  queryParams
) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // Add authorization token to headers if provided
  if (authorizationToken) {
    headers['Authorization'] = `Bearer ${authorizationToken}`;
  }

  // Merge custom headers with default headers
  if (customHeaders) {
    for (const headerKey in customHeaders) {
      headers[headerKey] = customHeaders[headerKey];
    }
  }

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  }

  // Create Axios request configuration
  const config = {
    method,
    url: isEmptyObject(queryParams) ? url: `${url}?${new URLSearchParams(queryParams)}`,
    headers,
    data: payload,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default function useAxios(
  url,
  method,
  payload,
  authorizationToken,
  customHeaders,
  queryParams = {}
) {
  const [apiState, setApiState] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [toCallApi, setApiExecution] = useState(false);

  const execute = () => {
    setApiExecution(true);
  };

  const fetchApi = useCallback(() => {
    setApiState(true);
    setError(null);
    console.log('payload is',payload)
    createAxiosRequest(url, method, payload, authorizationToken, customHeaders, queryParams)
      .then((res) => {
        if (res) {
          setData(res);
          setError(null);
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          toast.error(e?.response?.data?.message)
          // console.log("Token is expired. Logging out");
          // Add your logic for handling expired tokens and logging out
        } else if (e?.response?.status === 422) {
          setData(null);
          console.log('e is',e)
          toast.error(getFirstError(e?.response?.data.errors))
          setError(e?.response ? e?.response?.data?.message : e?.message);
          console.log('errors', e?.errors);
          console.log('Error:', e.message);
        } else {
          setData(null);
          setError(e?.response ? e?.response?.data : e?.message);
          console.log('Error:', e.message);
          toast.error(e?.response ? e?.response?.data?.message : e?.message)
          console.log('into error', e?.response ? e?.response?.data?.error : e?.message);
        }
      })
      .finally(() => {
        setApiExecution(false);
        setApiState(false);
      });
  }, [method, payload, url, authorizationToken, customHeaders, queryParams, toCallApi]);

  useEffect(() => {
    if (toCallApi && apiState === false) {
      fetchApi();
    }
  }, [toCallApi, apiState, fetchApi]);

  return {
    apiState,
    data,
    error,
    execute,
  };
}
