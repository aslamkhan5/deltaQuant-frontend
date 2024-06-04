import Login from "../../views/auth/login";
import SignUp from "../../views/auth/signup";
import ResetPassword from "../../views/auth/resetpassword";
import ConfirmPassword from "../../views/auth/confirmPassword";
import VerifyEmail from "../../views/auth/verifyEmail";
import EmailVerification from "../../views/auth/verification";

import {
  login,
  signup,
  resetPassword,
  verifyEmail,
  sendEmail,
  updatePassword,
} from "../pathName";

export const PublicRoutes = [
  {
    title: "Signup",
    component: SignUp,
    path: signup,
  },
  {
    title: "Login",
    component: Login,
    path: login,
  },
  {
    title: "Reset Password",
    component: ResetPassword,
    path: resetPassword,
  },
  {
    title: "Verify Email",
    component: VerifyEmail,
    path: sendEmail,
  },
  {
    title: "Email Verification",
    component: EmailVerification,
    path: verifyEmail,
  },
  {
    title: "Update Password",
    component: ConfirmPassword,
    path: updatePassword,
  },
];
