import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Box } from "@mui/material"
import Api from "../../services/api"
import { Check, Cross } from "../../utils/images"
import { isTokenExpired } from "../../helpers"
import {jwtDecode} from "jwt-decode" // Assuming jwtDecode is imported from 'jwt-decode' package

const EmailVerificationModal = ({ show, onClose, title, description, icon }) => (
  <Dialog open={show} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Box display="flex" flexDirection="column" alignItems="center">
        <img src={icon} alt={title} style={{ width: 50, height: 50 }} />
        <Typography variant="body1" align="center" mt={2}>
          {description}
        </Typography>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary" autoFocus>
        Close
      </Button>
    </DialogActions>
  </Dialog>
)

const EmailVerification = () => {
  const url = window.location.href
  const parts = url.split("/")
  const token = parts[parts.length - 2]
  const navigate = useNavigate()
  const [verificationStatus, setVerificationStatus] = useState("pending")

  const handleVerifyEmail = async () => {
    try {
      const response = await Api.emailVerification(token)
      if (response.success) {
        setVerificationStatus("success")
        setTimeout(() => navigate("/"), 3000)
      } else toast.error(response?.message)
    } catch (error) {
      toast.error(error?.data?.message)
      navigate("/")
    }
  }

  useEffect(() => {
    if (token) {
      const decodedAuthToken = jwtDecode(token)
      if (isTokenExpired(decodedAuthToken.exp)) {
        setVerificationStatus("error")
        const timeoutId = setTimeout(() => {
          navigate("/")
        }, 2000)
        return () => clearTimeout(timeoutId)
      } else {
        handleVerifyEmail()
      }
    } else {
      navigate("/")
    }
  }, [token, navigate])

  return (
    <>
      {verificationStatus === "success" && (
        <EmailVerificationModal
          show={true}
          onClose={() => setVerificationStatus("pending")}
          title="Email Verified Successfully"
          description="Your email has been successfully verified. You can now access your account."
          icon={Check}
        />
      )}
      {verificationStatus === "error" && (
        <EmailVerificationModal
          show={true}
          onClose={() => {
            setVerificationStatus("pending")
            navigate("/")
          }}
          title="Error"
          description="Link is expired"
          icon={Cross}
        />
      )}
    </>
  )
}

export default EmailVerification
