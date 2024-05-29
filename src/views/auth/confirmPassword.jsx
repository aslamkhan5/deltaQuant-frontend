import React, { useEffect, useState } from "react"
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import { Cross, User } from "../../utils/images/index"
import { HiOutlineArrowRight } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { isTokenExpired, validatePassword } from "../../helpers"
import {jwtDecode} from "jwt-decode"
import Api from "../../services/api"
import PasswordInput from "../../components/PasswordInput"
import EmailVerificationModal from "../../components/EmaiVerificationModal"
import { primaryColor } from "../../constants/color"

const ConfirmPassword = () => {
  const navigate = useNavigate()
  const url = window.location.href
  const parts = url.split("/")
  const token = parts[parts.length - 2]

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordUpdated, setIsPasswordUpdated] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState(false)
  const [tokenVerification, setTokenVerification] = useState(false)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    const errorMessage =
      name === "password"
        ? !validatePassword(value)
          ? "Password: 1 lowercase, 1 uppercase, 1 number, 1 symbol, min. 8 characters."
          : ""
        : ""
    setErrors({ ...errors, [name]: errorMessage })
  }

  const handleTogglePassword = (event, stateToUpdate) => {
    event.preventDefault()
    stateToUpdate((prevState) => !prevState)
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    const { password, confirmPassword } = formData

    switch (true) {
      case !password.trim():
        setErrors({ password: "Please enter your password" })
        return
      case !validatePassword(password):
        setErrors({
          password:
            "Password: 1 lowercase, 1 uppercase, 1 number, 1 symbol, min. 8 characters.",
        })
        return
      case !confirmPassword.trim():
        setErrors({ confirmPassword: "Please confirm your password" })
        return
      case password !== confirmPassword:
        setErrors({ confirmPassword: "Passwords do not match" })
        return
      default:
        break
    }
    try {
      setLoading(true)

      const response = await Api.updatePassword(formData, token)
      if (response.success) {
        toast.success(response.message)
        navigate("/")
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update password")
    } finally {
      setLoading(false)
    }
  }

  const isPasswordUpdated = async () => {
    try {
      const response = await Api.getIsPasswordUpdated(token)
      if (response.success) {
        setIsPasswordUpdated(response?.isPasswordUpdated)
        if (response?.isPasswordUpdated)
          setTimeout(() => {
            navigate("/reset-password")
          }, 3000)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    const url = window.location.href
    const parts = url.split("/")
    const token = parts[parts.length - 2]

    if (token) {
      const decodedAuthToken = jwtDecode(token)
      if (isTokenExpired(decodedAuthToken.exp)) {
        setTokenVerification(true)
        const timeoutId = setTimeout(() => {
          navigate("/reset-password")
        }, 3000)
        return () => clearTimeout(timeoutId)
      } else {
        isPasswordUpdated(token)
      }
    }
  }, [navigate])

  return (
    <>
      {tokenVerification ? (
        <EmailVerificationModal
          show={true}
          onClose={() => setTokenVerification(false)}
          title="Error"
          description="Link has been expired"
          icon={Cross}
        />
      ) : passwordUpdated ? (
        <EmailVerificationModal
          show={true}
          onClose={() => navigate("/reset-password")}
          title="Error"
          description="This link has been used to update your password once."
          icon={Cross}
        />
      ) : (
        <Container maxWidth="sm" className="main-wrapper">
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h4" component="h1">
                  Enter new password
                </Typography>
                <img src={User} alt="Logo" style={{ width: 50, height: 50 }} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <form className="mt-5 login-form" onSubmit={handleUpdatePassword}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <PasswordInput
                      fullWidth
                      type="password"
                      placeholder="New password"
                      showPassword={showPassword}
                      handleTogglePassword={(e) =>
                        handleTogglePassword(e, setShowPassword)
                      }
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      error={!!errors.password}
                      helperText={errors.password}
                      label="New Password"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PasswordInput
                      fullWidth
                      type="password"
                      placeholder="Confirm password"
                      showPassword={confirmPassword}
                      handleTogglePassword={(e) =>
                        handleTogglePassword(e, setConfirmPassword)
                      }
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      label="Confirm Password"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{ backgroundColor: primaryColor }}
                      disabled={loading}
                      endIcon={
                        loading ? <CircularProgress size={20} /> : <HiOutlineArrowRight />
                      }
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  )
}

export default ConfirmPassword
