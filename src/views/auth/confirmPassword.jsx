import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { Cross, User } from "../../utils/images/index";
import { HiOutlineArrowRight } from "react-icons/hi2";
import FormLabel from "../../components/FormLabel";
import PasswordInput from "../../components/PasswordInput";
import Api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isTokenExpired, validatePassword } from "../../helpers";
import { jwtDecode } from "jwt-decode";
import EmailVerificationModal from "../../components/EmaiVerificationModal";

const ConfirmPassword = () => {
  const navigate = useNavigate();
  const url = window.location.href;
  const parts = url.split("/");
  const token = parts[parts.length - 2];

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordUpdated, setIsPasswordUpdated] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState(false);
  const [tokenVerification, setTokenVerification] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const errorMessage =
      name === "password"
        ? !validatePassword(value)
          ? "Password: 1 lowercase, 1 uppercase, 1 number, 1 symbol, min. 8 characters."
          : ""
        : "";
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleTogglePassword = (event, stateToUpdate) => {
    event.preventDefault();
    stateToUpdate((prevState) => !prevState);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    switch (true) {
      case !password.trim():
        setErrors({ password: "Please enter your password" });
        return;
      case !validatePassword(password):
        setErrors({
          password:
            "Password: 1 lowercase, 1 uppercase, 1 number, 1 symbol, min. 8 characters.",
        });
        return;
      case !confirmPassword.trim():
        setErrors({ confirmPassword: "Please confirm your password" });
        return;
      case password !== confirmPassword:
        setErrors({ confirmPassword: "Passwords do not match" });
        return;
      default:
        break;
    }
    try {
      setLoading(true);

      const response = await Api.updatePassword(formData, token);
      if (response.success) {
        toast.success(response.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const isPasswordUpdated = async () => {
    try {
      const response = await Api.getIsPasswordUpdated(token);
      if (response.success) {
        setIsPasswordUpdated(response?.isPasswordUpdated);
        if (response?.isPasswordUpdated)
          setTimeout(() => {
            navigate("/reset-password");
          }, 3000);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const url = window.location.href;
    const parts = url.split("/");
    const token = parts[parts.length - 2];

    // if (token) {
    //   const decodedAuthToken = jwtDecode(token);
    //   if (isTokenExpired(decodedAuthToken.exp)) {
    //     setTokenVerification(true);
    //     const timeoutId = setTimeout(() => {
    //       navigate("/reset-password");
    //     }, 3000);
    //     return () => clearTimeout(timeoutId);
    //   } else {
    //     isPasswordUpdated(token);
    //   }
    // }
  }, [navigate]);
  return (
    <>
      {tokenVerification ? (
        <div>
          <EmailVerificationModal
            show={true}
            onClose={() => setTokenVerification(true)}
            title="Error"
            description="Link has been expired"
            icon={Cross}
          />
        </div>
      ) : passwordUpdated ? (
        <div>
          <EmailVerificationModal
            show={true}
            onClose={() => navigate("/reset-password")}
            title="Error"
            description="This link has been used to update your password once."
            icon={Cross}
          />
        </div>
      ) : (
        <Container fluid className="main-wrapper">
          <Row>
            <Col lg={12} md={12} sm={12} className="user-transformation">
              <div className="create-account create-new-password">
                <div className=" d-flex gap-3 align-items-center">
                  <h1 className="main-heading mb-0 mt-1">Enter new password</h1>
                  <img src={User} alt="Logo" className="user-img" />
                </div>
                <Form className="mt-5 login-form">
                  <div className="form-group d-flex flex-column gap-2">
                    <FormLabel
                      className="form-label"
                      labelText="New Password"
                      required={true}
                    />
                    <PasswordInput
                      className="form-input"
                      type="password"
                      placeholder="New password"
                      showPassword={showPassword}
                      handleTogglePassword={(e) =>
                        handleTogglePassword(e, setShowPassword)
                      }
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <p className="error-message secondary-text mb-0">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="form-group formlabel-input d-flex flex-column gap-2 mt-4 ">
                    <FormLabel
                      className="form-label"
                      labelText="Confirm Password"
                      required={true}
                    />
                    <PasswordInput
                      className="form-input"
                      type="password"
                      placeholder="Confirm password"
                      showPassword={confirmPassword}
                      handleTogglePassword={(e) =>
                        handleTogglePassword(e, setConfirmPassword)
                      }
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                      <p className="error-message secondary-text mb-0">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <button
                    formlabel-input
                    className=" primary-btn mt-4  d-flex gap-2 justify-content-center align-items-center"
                    onClick={(e) => handleUpdatePassword(e)}
                  >
                    Save
                    {loading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      <HiOutlineArrowRight className="right-arrow" />
                    )}
                  </button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ConfirmPassword;
