import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { Lock } from "../../utils/images/index";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField";
import FormLabel from "../../components/FormLabel";
import Api from "../../services/api";
import { toast } from "react-toastify";
import { isValidEmail } from "../../helpers";

const ResetPassword = () => {
  const recaptchaRef = React.createRef();
  const [captchaValue, setCaptchaValue] = useState(false);
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: "", captcha: "" });
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (isValidEmail(value)) {
      setErrors({ email: "" });
    }
  };

  const resetStatus = async (e) => {
    e.preventDefault();
    const validEmail = isValidEmail(formData.email);
    if (!validEmail) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }
    if (validEmail && !captchaValue) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        captcha: "Recaptcha required",
      }));
      return;
    }

    try {
      const response = await Api.getResetPasswordStatus(formData?.email);
      if (response.success) {
        setIsEmailSent(response?.emailStatus);
        if (!response?.emailStatus) handleForgotPassword(e);
        else {
          toast.error("Email already sent");
        }
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const handleIsEmailSent = (e) => {
    e.preventDefault();
    const validEmail = isValidEmail(formData.email);
    if (!validEmail) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }
    if (isEmailSent) return toast.error("Email already sent");
  };
  const handleForgotPassword = async (e, type) => {
    e.preventDefault();

    try {
      if (!type) setLoading(true);

      const response = await Api.forgotPassword({ email: formData.email });

      if (response?.success) {
        toast.success(response.message);
      } else {
        console.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="main-wrapper">
      <Row>
        <Col lg={12} md={12} sm={12} className="user-transformation">
          <div className="create-account">
            <div className=" d-flex gap-3 align-items-center">
              <h1 className="main-heading mb-1 mt-1">Reset password</h1>
              <img src={Lock} alt="Lock" className="user-img" />
            </div>

            <p className="main-desc mt-3 mt-md-3 mt-sm-2">
              Enter your email to reset your password
            </p>

            <Form className="mt-5">
              <div className="form-group d-flex flex-column gap-2">
                <FormLabel
                  className="form-label"
                  labelText="Email Address"
                  required={true}
                />
                <div className="send-invite d-flex">
                  <InputField
                    className="form-input"
                    placeholder="Enter Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <button
                    className="sendlink-btn d-flex justify-content-center align-items-center gap-2"
                    onClick={(e) =>
                      isEmailSent ? handleIsEmailSent(e) : resetStatus(e)
                    }
                    disabled={loading}
                  >
                    Send Link
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
                </div>
                {errors.email && (
                  <p className="error-message secondary-text mb-0">
                    {errors.email}
                  </p>
                )}
              </div>
              <p className="go-signin advanced-details">
                Still having trouble accessing your account? Send us
                an email at
                <Link
                  className="secondary-text"
                  onClick={() =>
                    (window.location.href = `mailto:${"help@deltaQuant"}`)
                  }
                >
                  &nbsp;help@deltaQuant
                </Link>{" "}
                and we’ll get it sorted out for you.
              </p>
              {isEmailSent ? (
                <p className="go-signin">
                  Don’t Receive Email?
                  <a
                    href="/"
                    className="secondary-text"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isEmailSent) handleForgotPassword(e, "resend");
                    }}
                  >
                    &nbsp;Resend Email
                  </a>
                </p>
              ) : (
                <></>
              )}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
