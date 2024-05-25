import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { Lock } from "../../utils/images/index";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import Api from "../../services/api";

const VerifyEmail = () => {
  const location = useLocation();
  const { email } = location?.state;
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      if (!isEmailSent) setLoading(true);
      const response = await Api.sendVerificationEmail({ email: email });

      if (response?.success) {
        toast.success(response.message);
        setIsEmailSent(true);
      } else {
        console.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    } finally {
      if (!isEmailSent) setLoading(false);
    }
  };

  const handleIsEmailSent = (e) => {
    e.preventDefault();
    if (isEmailSent) return toast.error("Email already sent");
  };

  const emailStatus = async () => {
    try {
      const response = await Api.getEmailStatus(token);
      if (response.success) {
        setIsEmailSent(response?.emailStatus);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    emailStatus();
  }, []);

  return (
    <Container fluid className="main-wrapper">
      <Row>
        <Col lg={12} md={12} sm={12} className="user-transformation">
          <div className="create-account">
            <div className=" d-flex gap-3 align-items-center">
              <h1 className="main-heading mb-0 mt-1">Verify Your Email</h1>
              <img src={Lock} alt="Lock" className="user-img" />
            </div>

            <p className="main-desc mt-3">
              Please verify your email address by clicking the button below, and
              we’ll send you a link to your inbox.
            </p>

            <Form className="mt-5 login-form">
              <div className="verify-box">
                <button
                  className="primary-btn d-flex align-items-center justify-content-center gap-2"
                  onClick={(e) =>
                    isEmailSent ? handleIsEmailSent(e) : handleVerifyEmail(e)
                  }
                  // disabled={isEmailSent}
                >
                  Verify Email Address{" "}
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
              {isEmailSent ? (
                <p className="go-signin">
                  Don’t Receive Email?
                  <a
                    href="/"
                    className="secondary-text"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isEmailSent) handleVerifyEmail(e);
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

export default VerifyEmail;
