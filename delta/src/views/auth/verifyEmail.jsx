import React, { useEffect, useState } from "react"
import { Container, Grid, Box, Typography, Button, CircularProgress, Link } from "@mui/material"
import { HiOutlineArrowRight } from "react-icons/hi2"
import { Lock } from "../../utils/images/index"
import { useLocation } from "react-router"
import { toast } from "react-toastify"
import Api from "../../services/api"

const VerifyEmail = () => {
  const location = useLocation()
  const { email } = location?.state
  const token = localStorage.getItem("token")
  const [loading, setLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleVerifyEmail = async (e) => {
    e.preventDefault()
    try {
      if (!isEmailSent) setLoading(true)
      const response = await Api.sendVerificationEmail({ email })

      if (response?.success) {
        toast.success(response.message)
        setIsEmailSent(true)
      } else {
        console.error(response?.message)
      }
    } catch (error) {
      toast.error(error?.data?.message)
    } finally {
      if (!isEmailSent) setLoading(false)
    }
  }

  const handleIsEmailSent = (e) => {
    e.preventDefault()
    if (isEmailSent) return toast.error("Email already sent")
  }

  const emailStatus = async () => {
    try {
      const response = await Api.getEmailStatus(token)
      if (response.success) {
        setIsEmailSent(response?.emailStatus)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    emailStatus()
  }, [])

  return (
    <Container maxWidth="md">
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
        <Grid item xs={12} md={8}>
          <Box className="create-account" p={4} boxShadow={3} borderRadius={2}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Typography variant="h4" component="h1" gutterBottom>
                Verify Your Email
              </Typography>
              <img src={Lock} alt="Lock" className="user-img" />
            </Box>
            <Typography variant="body1" className="main-desc">
              Please verify your email address by clicking the button below, and we’ll send you a link to your inbox.
            </Typography>
            <Box mt={5}>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => (isEmailSent ? handleIsEmailSent(e) : handleVerifyEmail(e))}
                endIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <HiOutlineArrowRight />
                  )
                }
                fullWidth
                disabled={isEmailSent}
              >
                Verify Email Address
              </Button>
            </Box>
            {isEmailSent && (
              <Typography variant="body2" mt={2}>
                Don’t Receive Email?
                <Link
                  href="/"
                  onClick={(e) => {
                    e.preventDefault()
                    if (isEmailSent) handleVerifyEmail(e)
                  }}
                >
                  &nbsp;Resend Email
                </Link>
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default VerifyEmail
