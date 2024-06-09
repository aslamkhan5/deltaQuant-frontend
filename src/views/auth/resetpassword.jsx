import React, { useEffect, useState } from "react"
import { Grid, Typography, TextField, Container } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Api from "../../services/api"
import { toast } from "react-toastify"
import { isValidEmail } from "../../helpers"
import PrimaryButton from "../../components/PrimaryButton"
import useAxios from "../../hooks/useAxios"
import { config } from "../../configs"
import { login } from "../../routes/pathName"
import LogoContainer from "../../components/LogoContainer"
import { defaultSpacing } from "../../constants"

const ResetPassword = () => {
  const navigate = useNavigate()
  const [captchaValue, setCaptchaValue] = useState(true)
  const [formData, setFormData] = useState({ email: "" })
  const [errors, setErrors] = useState({ email: "", captcha: "" })
  const [loading, setLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const {apiState,data,error,execute} = useAxios(`${config.ApiBaseURL}/api/guest/forget-password`,'POST',formData)
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

    if(validEmail && captchaValue) {
      // we will do this in success scenario of data?.status 
      // const encodedEmail = encodeURIComponent(formData?.email)
      // navigate(`/${encodedEmail}/update-password`)
      execute()
    }
    // try {
    //   const response = await Api.getResetPasswordStatus(formData?.email)
    //   if (response.success) {
    //     setIsEmailSent(response?.emailStatus)
    //     if (!response?.emailStatus) handleForgotPassword(e)
    //     else {
    //       toast.error("Email already sent")
    //     }
    //   }
    // } catch (error) {
    //   toast.error(error.data.message)
    // }
  }

  useEffect (()=> {
    if(data) {
      if(data?.status) {
        toast.success(data?.message)
        navigate(login)
      } else {
        toast.error(data?.message || "Something wrongs!")
      }
    }
  },[data])

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
    // e.preventDefault()

    // try {
    //   if (!type) setLoading(true)

    //   const response = await Api.forgotPassword({ email: formData.email })

    //   if (response?.success) {
    //     toast.success(response.message)
    //   } else {
    //     console.error(response?.message)
    //   }
    // } catch (error) {
    //   toast.error(error?.data?.message)
    // } finally {
    //   setLoading(false)
    // }
  }

  return (
    <Container maxWidth="lg">
      <Grid container direction="column" height="100vh" className="main-wrapper" alignItems="center">
        <LogoContainer/>
            <Typography sx={{ fontWeight: "600", fontSize: 44,textAlign:"center" }} component="h1" color="#F8F8F8">
            Reset your password
            </Typography>
            <Typography
              mb={2}
              color="#FFFFFF"
              sx={{ fontWeight: 400, fontSize: 16, textAlign: 'center' }}
            >
              Type in your registered email address to reset password
            </Typography>
            <Grid container justifyContent="center" sx={{ mb: defaultSpacing }}>
              <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
                <TextField
                  fullWidth
                  placeholder="Enter your email address"
                  type="text"
                  id="email"
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
            <Grid container justifyContent="center" sx={{ mb: defaultSpacing }}>
              <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
                <PrimaryButton
                  loading={apiState}
                  title="Next"
                  onClick={resetStatus}
                  variant="container"
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
                <PrimaryButton
                  title="Back to Login"
                  onClick={()=>navigate(login)}
                  // variant="outlined"
                  backgroundColor="transparent"
                  textColor="white"
                />
              </Grid>
            </Grid>
      </Grid>
    </Container>
  )
}

export default ResetPassword
