import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { User } from "../../utils/images/index";
import { Link, useNavigate } from "react-router-dom";
import FormLabel from "../../components/FormLabel";
import InputField from "../../components/InputField";
import SocialLinks from "../../components/SocialLinks";
import PasswordInput from "../../components/PasswordInput";
import { toast } from "react-toastify";
import Api from "../../services/api";
import { isValidEmail, validateForm, validatePassword } from "../../helpers";

const SignUp = () => {
  const recaptchaRef = React.createRef();
  const navigate = useNavigate();
  const [captchaValue, setCaptchaValue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    privacyPolicy: false,
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    privacyPolicy: "",
    captcha: "",
  });
  const [loading, setLoading] = useState(false);

  const handleTogglePassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handlePrivacyPolicy = (e) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      privacyPolicy: checked,
    });
    if (checked && errors.privacyPolicy) {
      setErrors({
        ...errors,
        privacyPolicy: "",
      });
    }
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

    if (name === "password" && !validatePassword(value)) {
      newErrors.password =
        "Password: 1 lowercase, 1 uppercase, 1 number, 1 symbol, min. 8 characters.";
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm(
      formData,
      setErrors,
      isValidEmail,
      validatePassword
    );

    if (isValid && !captchaValue) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        captcha: "Recaptcha required",
      }));
      return;
    }

    if (isValid && captchaValue) {
      try {
        setLoading(true);
        const response = await Api.register({
          email: formData.username,
          password: formData.password,
        });
        if (response?.success) {
          localStorage.setItem("token", response.data.token);
          toast.success("Signup Succcessfully");

          navigate("/send-email", { state: { email: formData.username } });
        } else {
          console.error(response?.message);
        }
      } catch (error) {
        toast.error(error?.data?.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("userRole");
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (role || userId) navigate("/dashboard");
  }, []);

  return (
    <Container fluid className="main-wrapper">
      <Row>
        <Col lg={12} md={12} sm={12} className="user-transformation">
          <div className="create-account">
            <div className=" d-flex gap-3 align-items-center">
              <h1 className="main-heading mb-0 mt-1">Create your account</h1>
              <img src={User} alt="Logo" className="user-img" />
            </div>

            <Form className="mt-5 login-form" onSubmit={handleSubmit}>
              <div className="form-group d-flex flex-column gap-2">
                <FormLabel
                  className="form-label"
                  labelText="Email Address"
                  required={true}
                />
                <InputField
                  className="form-input"
                  placeholder="Enter your email address"
                  type="text"
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
                  className="form-label"
                  labelText="Password"
                  required={true}
                />
                <PasswordInput
                  className="form-input"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  name="password"
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
              <div className="formlabel-input d-flex align-items-center gap-2 mt-4 ">
                <input
                  type="checkbox"
                  className="checkbox-box"
                  checked={formData.privacyPolicy}
                  onChange={(e) => handlePrivacyPolicy(e)}
                />
                <p className="checkbox-desc mb-0">
                  I agree to DeltaQuant’s Website <b> Terms of Use </b> and
                  <b> Privacy Policy </b>
                </p>
              </div>
              {errors.privacyPolicy && (
                <p className="error-message secondary-text mb-0 mt-3">
                  {errors.privacyPolicy}
                </p>
              )}
              <button
                type="submit"
                className=" primary-btn mt-4 d-flex gap-2 justify-content-center align-items-center "
                disabled={loading}
              >
                Create Account
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
                Already on DeltaQuant?
                <Link to="/" className="secondary-text">
                  &nbsp;Sign in
                </Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
