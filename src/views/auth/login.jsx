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
} from "@mui/material"
import { HiOutlineArrowRight } from "react-icons/hi2"
import { User } from "../../utils/images/index"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import InputField from "../../components/InputField"
import PasswordInput from "../../components/PasswordInput"
import SocialLinks from "../../components/SocialLinks"
import { isValidEmail, validateForm } from "../../helpers"
import LoaderGif from "../../components/LoaderGif"
import { primaryColor } from "../../constants/color"
import PrimaryButton from "../../components/PrimaryButton"

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(true)

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

    setErrors(newErrors)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/dashboard")
  }

  const handleRememberMe = (e) => {
    const { checked } = e.target
    setFormData({
      ...formData,
      rememberMe: checked,
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false)
    }, 2000)

    const role = localStorage.getItem("userRole")

    if (role && role !== "null") navigate("/dashboard")

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <>
      {loader ? (
        <LoaderGif />
      ) : (
        <Grid container direction="column" className="main-wrapper" alignItems="center" gap={2}>
          <Typography sx={{ fontWeight: "600", fontSize: 44 }} component="h1" color="#F8F8F8">
            Sign in to your account
          </Typography>
          <Typography mb={2} color="#FFFFFF" sx={{ fontWeight: 400, fontSize: 16, textAlign: "center" }}>
            Sign in to trace account to start managing your inventory <br /> in a go with
            our easy to use dashboard
          </Typography>
          <Grid container justifyContent="center" sx={{ mb: 2 }}>
            <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
              <TextField
                fullWidth
                placeholder="Enter your email address"
                type="text"
                id="username"
                sx={{ background: "white", borderRadius: 1 }}
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
                <Box display="flex" alignItems="center" gap={1}>
                  <Checkbox
                    title="label"
                    checked={formData.rememberMe}
                    onChange={handleRememberMe}
                  // style={{color:"white",accentColor:"red"}}
                  />
                  <Typography variant="body2" color="secondary">
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
                loading={loading}
                title="Sign In"
                onClick={() => {
                  console.log('login clicked');
                }}
                backgroundColor={primaryColor}
                variant="container"
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
        </Grid>
      )}
    </>
  )
}

export default Login
