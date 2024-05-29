import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { Container, Grid, Typography, TextField, Checkbox, Button, CircularProgress, Box } from "@mui/material"
import { HiOutlineArrowRight } from "react-icons/hi2"
import { User } from "../../utils/images/index"
import FormLabel from "../../components/FormLabel"
import InputField from "../../components/InputField"
import SocialLinks from "../../components/SocialLinks"
import PasswordInput from "../../components/PasswordInput"
import Api from "../../services/api"
import { isValidEmail, validateForm, validatePassword } from "../../helpers"

const SignUp = () => {
  const navigate = useNavigate()
  const [captchaValue, setCaptchaValue] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    privacyPolicy: false,
  })
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    privacyPolicy: "",
    captcha: "",
  })
  const [loading, setLoading] = useState(false)

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

    if (name === "username" && !isValidEmail(value)) {
      newErrors.username = "Please enter a valid email address"
    }

    if (name === "password" && !validatePassword(value)) {
      newErrors.password =
        "Password: 1 lowercase, 1 uppercase, 1 number, 1 symbol, min. 8 characters."
    }

    setErrors(newErrors)
  }

  const handleSubmit = async (e) => {
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
      try {
        setLoading(true)
        const response = await Api.register({
          email: formData.username,
          password: formData.password,
        })
        if (response?.success) {
          localStorage.setItem("token", response.data.token)
          toast.success("Signup Successfully")

          navigate("/send-email", { state: { email: formData.username } })
        } else {
          console.error(response?.message)
        }
      } catch (error) {
        toast.error(error?.data?.message)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const role = localStorage.getItem("userRole")
    window.scrollTo({ top: 0, behavior: "smooth" })

    if (role || userId) navigate("/dashboard")
  }, [navigate])

  return (
    <Container maxWidth="sm">
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h4" component="h1">
              Create your account
            </Typography>
            <img src={User} alt="Logo" style={{ width: 50, height: 50 }} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormLabel required>Email Address</FormLabel>
                <TextField
                  fullWidth
                  placeholder="Enter your email address"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel required>Password</FormLabel>
                <PasswordInput
                  fullWidth
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                  showPassword={showPassword}
                  handleTogglePassword={handleTogglePassword}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Checkbox
                    checked={formData.privacyPolicy}
                    onChange={handlePrivacyPolicy}
                  />
                  <Typography>
                    I agree to DeltaQuant’s Website <b>Terms of Use</b> and <b>Privacy Policy</b>
                  </Typography>
                </Box>
                {errors.privacyPolicy && (
                  <Typography color="error">{errors.privacyPolicy}</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  endIcon={
                    loading ? <CircularProgress size={20} /> : <HiOutlineArrowRight />
                  }
                >
                  Create Account
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center">Or</Typography>
              </Grid>
              <Grid item xs={12}>
                <SocialLinks />
              </Grid>
              <Grid item xs={12}>
                <Typography align="center">
                  Already on DeltaQuant? <Link to="/">Sign in</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SignUp
