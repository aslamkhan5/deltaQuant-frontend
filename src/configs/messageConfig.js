export const getFirstError = (errorObject) => {
  if (!errorObject) {
    return null;
  }

  for (const key in errorObject) {
    if (Array.isArray(errorObject[key]) && errorObject[key].length > 0) {
      return errorObject[key][0];
    }
  }

  return null;
};
