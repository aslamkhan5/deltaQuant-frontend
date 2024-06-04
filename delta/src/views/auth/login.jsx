import React, { useEffect, useState } from "react"
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  Checkbox,
  Link as MuiLink,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { HiOutlineArrowRight } from "react-icons/hi2"
import { User } from "../../utils/images/index"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import InputField from "../../components/InputField"
import PasswordInput from "../../components/PasswordInput"
import SocialLinks from "../../components/SocialLinks"
import { isValidEmail, validateForm, validatePassword } from "../../helpers"
import LoaderGif from "../../components/LoaderGif"
import { primaryColor } from "../../constants/color"
import PrimaryButton from "../../components/PrimaryButton"
import { useAuth } from "../../context/authContext"
import useAxios from "../../hooks/useAxios"
import { config } from "../../configs"
import { toast } from "react-toastify"
import ReCAPTCHA from "react-google-recaptcha";
const Login = () => {
  const recaptchaRef = React.createRef();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const [captchaError, setCaptchError] = useState(false)
  const { authenticate } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    captcha: null,
    rememberMe: false,
  })
  const { apiState, data, error, execute } = useAxios(`${config.ApiBaseURL}/api/guest/login?email=${formData.username}&password=${formData.password}`, 'GET')
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  })

  const handleTogglePassword = (event) => {
    event.preventDefault()
    setShowPassword(!showPassword)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    const newErrors = { ...errors }

    if (newErrors[name] && value.trim() !== "") {
      delete newErrors[name]
    }

    if (name === "username" && !isValidEmail(value)) {
      newErrors.username = "Please enter a valid email address"
    }

    if (name === "password" && !validatePassword(value)) {
      newErrors.password =
        "Password: 1 lowercase, 1 uppercase, 1 number, 1 symbol, min. 8 characters."
    }

    setErrors(newErrors)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    const isValid = validateForm(
      formData,
      setErrors,
      isValidEmail,
      validatePassword
    )
    if (formData.captcha) {
      if (isValid) {
        // execute()
        authenticate()
        navigate("/dashboard")
      }

    } else {
      setCaptchError(true)
    }
  }

  useEffect(() => {
    if (data?.status) {
      localStorage.setItem("token", data.token)
      toast.success(data.message)
      authenticate()
      navigate("/dashboard")
    }
  }, [data])
  const handleRememberMe = (e) => {
    const { checked } = e.target
    setFormData({
      ...formData,
      rememberMe: checked,
    })
  }
  // this will handle recaptcha value
  function onChange(value) {
    setFormData({
      ...formData,
      captcha: value
    })
  }
  useEffect(() => {
    // const timer = setTimeout(() => {
    //   setLoader(false)
    // }, 2000)

    const role = localStorage.getItem("userRole")

    if (role && role !== "null") navigate("/dashboard")

    // return () => clearTimeout(timer)
  }, [navigate])

  return (
    <Container maxWidth="lg">
      <Grid container direction="column" height="100vh" className="main-wrapper" gap={2}>
        <Typography sx={{ fontWeight: "600", fontSize: 44 }} component="h1" color="#F8F8F8">
          Sign in to your account
        </Typography>
        <Typography
          mb={2}
          color="#FFFFFF"
          sx={{ fontWeight: 400, fontSize: 16, textAlign: 'center' }}
        >
          Sign in to trace account to start managing your inventory
          {!isXs && <br />}
          in a go with our easy to use dashboard
        </Typography>
        <Grid container justifyContent="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
            <TextField
              fullWidth
              placeholder="Enter your email address"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              // label="Email Address"
              required
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
            <PasswordInput
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              showPassword={showPassword}
              handleTogglePassword={handleTogglePassword}
              error={!!errors.password}
              helperText={errors.password}
              label="Password"
              required
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <Checkbox
                  title="Remember me"
                  checked={formData.rememberMe}
                  onChange={handleRememberMe}
                  margin={0} padding={0}
                />
                <Typography variant="body2" color="secondary" sx={{ ml: 1 }}>
                  Remember me
                </Typography>
              </Box>
              <MuiLink component={Link} to="/reset-password" color="primary">
                Forgot password?
              </MuiLink>
            </Box>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
            <PrimaryButton
              loading={apiState}
              title="Sign In"
              onClick={handleLogin}
              variant="contained"
            />
          </Grid>
        </Grid>
        {/* <Grid container justifyContent="center">
                <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
                  <Typography variant="body2" align="center" color="primary" sx={{my:2}}>
                    Or
                  </Typography>
                </Grid>
              </Grid> */}
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
            <Typography variant="body2" align="center" sx={{ color: "white", mt: 3 }}>
              Don’t have an account yet?
              <MuiLink component={Link} to="/signup" color="primary">
                &nbsp;Sign up
              </MuiLink>
            </Typography>
          </Grid>
        </Grid>

        <Grid container justifyContent="center">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={config.RECAPTCHA_API_KEY}
            onChange={onChange}
          />
        </Grid>
        
        {captchaError && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              Please fill Recaptcha to login
            </Typography>
          )}
      </Grid>
    </Container>
  )
}

export default Login
