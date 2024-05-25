import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { User } from "../../utils/images/index";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import PasswordInput from "../../components/PasswordInput";
import FormLabel from "../../components/FormLabel";
import SocialLinks from "../../components/SocialLinks";
import { isValidEmail, validateForm } from "../../helpers";
import LoaderGif from "../../components/LoaderGif";

const Login = () => {
  const navigate = useNavigate();
  const recaptchaRef = React.createRef();
  const [captchaValue, setCaptchaValue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    captcha: "",
  });
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);

  const handleTogglePassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    const newErrors = { ...errors };

    if (newErrors[name] && value.trim() !== "") {
      delete newErrors[name];
    }

    if (name === "username" && !isValidEmail(value)) {
      newErrors.username = "Please enter a valid email address";
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    navigate("/dashboard");
  };

  const handleRememberMe = (e) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      rememberMe: checked,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 2000);

    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("userRole");

    if (role && role != "null") navigate("/dashboard");

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loader ? (
        <LoaderGif />
      ) : (
        <Container fluid className="main-wrapper">
          <Row>
            <Col lg={12} md={12} sm={12} className="user-transformation">
              <div className="create-account">
                <div className=" d-flex gap-3 align-items-center">
                  <h1 className="main-heading mb-0 mt-1">Welcome back</h1>
                  <img src={User} alt="Logo" className="user-img" />
                </div>
                <Form className="mt-5 login-form" onSubmit={handleSubmit}>
                  <div className="form-group d-flex flex-column gap-2">
                    <FormLabel
                      className="form-label aestaric"
                      labelText="Email Address"
                      required={true}
                    />
                    <InputField
                      className="form-input"
                      placeholder="Enter your email address"
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    {errors.username && (
                      <p className="error-message secondary-text mb-0">
                        {errors.username}
                      </p>
                    )}
                  </div>
                  <div className="form-group formlabel-input d-flex flex-column gap-2 mt-4 ">
                    <FormLabel
                      className="form-label  aestaric"
                      labelText="Password"
                      required={true}
                    />
                    <PasswordInput
                      className="form-input"
                      type="password"
                      placeholder="Enter your password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      showPassword={showPassword}
                      handleTogglePassword={handleTogglePassword}
                    />
                    {errors.password && (
                      <p className="error-message secondary-text mb-0">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className=" d-flex justify-content-between align-items-center mt-4 formlabel-input">
                    <div className="d-flex align-items-center gap-2">
                      <input
                        type="checkbox"
                        className="checkbox-box"
                        onClick={(e) => handleRememberMe(e)}
                      />
                      <p className="checkbox-desc mb-0 remember-text">
                        Remember me
                      </p>
                    </div>
                    <Link
                      to="/reset-password"
                      className="checkbox-desc fw-normal"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className=" primary-btn mt-4 d-flex gap-2 justify-content-center align-items-center "
                    disabled={loading}
                  >
                    Login
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
                  <p className="or-desc mt-4 mb-4">Or</p>
                  <SocialLinks />
                  <p className="go-signin ">
                    Don’t have an account yet?
                    <Link to="/signup" className="secondary-text">
                      &nbsp;Sign up today
                    </Link>
                  </p>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Login;
