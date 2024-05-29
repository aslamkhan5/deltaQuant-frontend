import React, { useEffect, useState } from "react"
import { Container, Grid, Typography, TextField, Button, CircularProgress, Box, Link as MuiLink } from "@mui/material"
import { HiOutlineArrowRight } from "react-icons/hi2"
import { Lock } from "../../utils/images/index"
import { Link } from "react-router-dom"
import InputField from "../../components/InputField"
import FormLabel from "../../components/FormLabel"
import Api from "../../services/api"
import { toast } from "react-toastify"
import { isValidEmail } from "../../helpers"

const ResetPassword = () => {
  const [captchaValue, setCaptchaValue] = useState(false)
  const [formData, setFormData] = useState({ email: "" })
  const [errors, setErrors] = useState({ email: "", captcha: "" })
  const [loading, setLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (isValidEmail(value)) {
      setErrors({ email: "" })
    }
  }

  const resetStatus = async (e) => {
    e.preventDefault()
    const validEmail = isValidEmail(formData.email)
    if (!validEmail) {
      setErrors({ email: "Please enter a valid email address" })
      return
    }
    if (validEmail && !captchaValue) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        captcha: "Recaptcha required",
      }))
      return
    }

    try {
      const response = await Api.getResetPasswordStatus(formData?.email)
      if (response.success) {
        setIsEmailSent(response?.emailStatus)
        if (!response?.emailStatus) handleForgotPassword(e)
        else {
          toast.error("Email already sent")
        }
      }
    } catch (error) {
      toast.error(error.data.message)
    }
  }

  const handleIsEmailSent = (e) => {
    e.preventDefault()
    const validEmail = isValidEmail(formData.email)
    if (!validEmail) {
      setErrors({ email: "Please enter a valid email address" })
      return
    }
    if (isEmailSent) return toast.error("Email already sent")
  }

  const handleForgotPassword = async (e, type) => {
    e.preventDefault()

    try {
      if (!type) setLoading(true)

      const response = await Api.forgotPassword({ email: formData.email })

      if (response?.success) {
        toast.success(response.message)
      } else {
        console.error(response?.message)
      }
    } catch (error) {
      toast.error(error?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" className="main-wrapper">
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h4" component="h1">
              Reset password
            </Typography>
            <img src={Lock} alt="Lock" style={{ width: 50, height: 50 }} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" className="main-desc" gutterBottom>
            Enter your email to reset your password
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={resetStatus}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormLabel required>Email Address</FormLabel>
                <Box display="flex" alignItems="center" gap={2}>
                  <TextField
                    fullWidth
                    placeholder="Enter Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => (isEmailSent ? handleIsEmailSent(e) : resetStatus(e))}
                    disabled={loading}
                    endIcon={loading ? <CircularProgress size={20} /> : <HiOutlineArrowRight />}
                  >
                    Send Link
                  </Button>
                </Box>
              </Grid>
              {errors.email && (
                <Grid item xs={12}>
                  <Typography color="error">{errors.email}</Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography variant="body2" className="advanced-details">
                  Still having trouble accessing your account? Send us an email at
                  <MuiLink
                    href="mailto:help@deltaQuant"
                    color="secondary"
                  >
                    &nbsp;help@deltaQuant
                  </MuiLink>{" "}
                  and we’ll get it sorted out for you.
                </Typography>
              </Grid>
              {isEmailSent && (
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Don’t Receive Email?
                    <MuiLink
                      href="/"
                      onClick={(e) => {
                        e.preventDefault()
                        if (isEmailSent) handleForgotPassword(e, "resend")
                      }}
                      color="secondary"
                    >
                      &nbsp;Resend Email
                    </MuiLink>
                  </Typography>
                </Grid>
              )}
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ResetPassword
