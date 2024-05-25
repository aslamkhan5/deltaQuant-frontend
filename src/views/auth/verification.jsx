import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import EmailVerificationModal from "../../components/EmaiVerificationModal";
import Api from "../../services/api";
import { jwtDecode } from "jwt-decode";
import { Check } from "../../utils/images";
import { Cross } from "../../utils/images";
import { isTokenExpired } from "../../helpers";

const EmailVerification = () => {
  const url = window.location.href;
  const parts = url.split("/");
  const token = parts[parts.length - 2];
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState("pending");
  // const [isVerified, setIsVerified] = useState(false);
  const handleVerifyEmail = async () => {
    try {
      const response = await Api.emailVerification(token);
      if (response.success) {
        setVerificationStatus("success");
        // toast.success(response.message);
        setTimeout(() => navigate("/"), 3000);
      } else toast.error(response?.message);
    } catch (error) {
      toast.error(error?.data?.message);
      navigate("/");
    }
  };

  // useEffect(() => {
  //   if (token) {
  //     const decodedAuthToken = jwtDecode(token);
  //     if (isTokenExpired(decodedAuthToken.exp)) {
  //       setVerificationStatus("error");
  //       const timeoutId = setTimeout(() => {
  //         navigate("/");
  //       }, 2000);
  //       return () => clearTimeout(timeoutId);
  //     } else {
  //       handleVerifyEmail();
  //     }
  //   } else {
  //     navigate("/");
  //   }
  // }, []);
  return (
    <>
      {verificationStatus === "success" && (
        <EmailVerificationModal
          show={true}
          onClose={() => setVerificationStatus("success")}
          title="Email Verified Successfully"
          description="Your email has been successfully verified. You can now access your account."
          icon={Check}
        />
      )}
      {verificationStatus === "error" && (
        <EmailVerificationModal
          show={true}
          onClose={() => {
            setVerificationStatus("pending");
            navigate("/");
          }}
          title="Error"
          description="Link is expired"
          icon={Cross}
        />
      )}
    </>
  );
};

export default EmailVerification;
