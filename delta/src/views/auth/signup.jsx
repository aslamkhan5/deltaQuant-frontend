import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { Container, Grid, Typography, TextField, Checkbox, Button, CircularProgress, Box, Link as MuiLink, FormControlLabel, useTheme, useMediaQuery } from "@mui/material"
import { HiOutlineArrowRight } from "react-icons/hi2"
import { User } from "../../utils/images/index"
import FormLabel from "../../components/FormLabel"
import InputField from "../../components/InputField"
import SocialLinks from "../../components/SocialLinks"
import PasswordInput from "../../components/PasswordInput"
import Api from "../../services/api"
import { isValidEmail, validateForm, validatePassword } from "../../helpers"
import PrimaryButton from "../../components/PrimaryButton"
import useAxios from "../../hooks/useAxios"
import { config } from "../../configs"
import { useAuth } from "../../context/authContext"

const SignUp = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    privacyPolicy: false,
  })
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const {apiState,data,error,execute} = useAxios(`${config.ApiBaseURL}/api/guest/register`,'POST',formData)
  const [captchaValue, setCaptchaValue] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const { authenticate } = useAuth()
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    privacyPolicy: "",
    captcha: "",
  })

  const handleTogglePassword = (event) => {
    event.preventDefault()
    setShowPassword(!showPassword)
  }

  const handlePrivacyPolicy = (e) => {
    const { checked } = e.target
    setFormData({
      ...formData,
      privacyPolicy: checked,
    })
    if (checked && errors.privacyPolicy) {
      setErrors({
        ...errors,
        privacyPolicy: "",
      })
    }
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

    if (name === "email" && !isValidEmail(value)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (name === "password" && !validatePassword(value)) {
      newErrors.password =
        "Password: 1 lowercase, 1 uppercase, 1 number, 1 symbol, min. 8 characters."
    }

    setErrors(newErrors)
  }

  useEffect(()=>{
    if (data?.status) {
      localStorage.setItem("token", data.token)
      toast.success(data.message)
      authenticate()
      navigate("/dashboard")
    }
  },[data])
  const handleSignUp = async (e) => {
    e.preventDefault()
    const isValid = validateForm(
      formData,
      setErrors,
      isValidEmail,
      validatePassword
    )
    if (isValid && !captchaValue) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        captcha: "Recaptcha required",
      }))
      return
    }
    if (isValid && captchaValue) {
      execute()
      // try {
      //   setLoading(true)
      //   const response = await Api.register({
      //     email: formData.email,
      //     password: formData.password,
      //   })
      //   if (response?.success) {
      //     localStorage.setItem("token", response.data.token)
      //     toast.success("SignUp Successfully")

      //     navigate("/send-email", { state: { email: formData.email } })
      //   } else {
      //     console.error(response?.message)
      //   }
      // } catch (error) {
      //   toast.error(error?.data?.message)
      // } finally {
      //   setLoading(false)
      // }
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const role = localStorage.getItem("userRole")
    window.scrollTo({ top: 0, behavior: "smooth" })

    if (role || userId) navigate("/dashboard")
  }, [navigate])

  return (
    <Container maxWidth="lg">
      <Grid container direction="column" className="main-wrapper" alignItems="center" gap={2}>
        <Typography sx={{ fontWeight: "600", fontSize: 44 }} component="h1" color="#F8F8F8">
          Sign Up to your account
        </Typography>
        <Typography
            mb={2}
            color="#FFFFFF"
            sx={{ fontWeight: 400, fontSize: 16, textAlign: 'center' }}
          >
            Sign up to trace account to start managing your inventory
            {!isXs && <br />}
            in a go with our easy to use dashboard
          </Typography>
        <Grid container justifyContent="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
            <TextField
              fullWidth
              placeholder="First Name"
              type="text"
              name="firstname"
              sx={{ background: "white", borderRadius: 1 }}
              value={formData.firstname}
              onChange={handleChange}
              error={!!errors.firstname}
              helperText={errors.firstname}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
            <TextField
              fullWidth
              placeholder="Last Name"
              type="text"
              name="lastname"
              sx={{ background: "white", borderRadius: 1 }}
              value={formData.lastname}
              onChange={handleChange}
              error={!!errors.lastname}
              helperText={errors.lastname}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
            <TextField
              fullWidth
              placeholder="Enter your email address"
              type="text"
              id="email"
              sx={{ background: "white", borderRadius: 1 }}
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
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
            <Box display="flex" alignItems="center">
              <Checkbox
                title="Remember me"
                checked={formData.privacyPolicy}
                onChange={handlePrivacyPolicy}
                margin={0} padding={0}
              />
              <Typography variant="body1" component="span" color="secondary">
                I agree to DeltaQuant’s Website <b>Terms of Use</b> and <b>Privacy Policy</b>
              </Typography>
            </Box>
            {errors.privacyPolicy && (
              <Typography variant="body2" color="error" className="mt-3 mb-0">
                {errors.privacyPolicy}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
            <PrimaryButton
              loading={apiState}
              title="Sign Up"
              onClick={handleSignUp}
              variant="contained"
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
            <Typography variant="body2" align="center" sx={{ color: "white", mt: 3 }}>
              Already have an account?
              <MuiLink component={Link} to="/login" color="primary">
                &nbsp;Login
              </MuiLink>
            </Typography>
          </Grid>
        </Grid>
      </Grid >
    </Container>
  )
}

export default SignUp
