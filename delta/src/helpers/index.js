import {
  emailRegex,
  instagramRegex,
  linkedInRegex,
  lowercaseRegex,
  numberRegex,
  symbolRegex,
  uppercaseRegex,
  websiteRegex,
} from "../constants";

export const validatePassword = (password) => {
  const lowercaseValid = lowercaseRegex.test(password);
  const uppercaseValid = uppercaseRegex.test(password);
  const numberValid = numberRegex.test(password);
  const symbolValid = symbolRegex.test(password);
  const lengthValid = password.length >= 8;
  return (
    lowercaseValid &&
    uppercaseValid &&
    numberValid &&
    symbolValid &&
    lengthValid
  );
};

export const isValidEmail = (email) => {
  return emailRegex.test(email);
};

export const validateUsername = (username) => {
  const regex = /^[a-zA-Z0-9-]+$/;
  return regex.test(username);
};

export const validateField = (
  value,
  fieldName,
  emptyErrorMessage,
  invalidErrorMessageFunc,
  errors
) => {
  if (value === "" || value === false) {
    errors[fieldName] = emptyErrorMessage;
  } else if (invalidErrorMessageFunc && invalidErrorMessageFunc(value)) {
    errors[fieldName] = invalidErrorMessageFunc(value);
  }
};

export const validateForm = (
  formData,
  setErrors,
  isValidEmail,
  validatePassword,
  type
) => {
  const newErrors = {};

  if (formData.firstName !== undefined) {
    validateField(
      formData.firstName,
      "firstName",
      "Please enter your first name",
      (value) => value.trim().length === 0 && "First name cannot be empty",
      newErrors
    );
  }

  if (formData.lastName !== undefined) {
    validateField(
      formData.lastName,
      "lastName",
      "Please enter your last name",
      (value) => value.trim().length === 0 && "Last name cannot be empty",
      newErrors
    );
  }

  if (formData.username !== undefined) {
    validateField(
      formData.username,
      "username",
      "Please enter your email address",
      (value) => !isValidEmail(value) && "Please enter a valid email address",
      newErrors
    );
  }

  if (validatePassword && formData.password !== undefined) {
    validateField(
      formData.password.trim(),
      "password",
      "Please enter your password",
      (value) =>
        !validatePassword(value) &&
        "Password must contain at least one lowercase letter, one uppercase letter, one number, one symbol, and be at least 8 characters long",
      newErrors
    );
  }

  if (formData.privacyPolicy !== undefined) {
    validateField(
      formData.privacyPolicy,
      "privacyPolicy",
      "Please check that you agree to our Terms of use and Privacy policy",
      null,
      newErrors
    );
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

export const linkedInUrl = (url) => {
  return linkedInRegex.test(url);
};

export const instagramUrl = (url) => {
  return instagramRegex.test(url);
};
export const websiteUrl = (url) => {
  return websiteRegex.test(url);
};

export const formatDate = (dateString, type) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return type === "month-year" ? `${month}-${year}` : `${month}-${day}-${year}`;
};

export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const timeDifference = now - date;
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));

  if (minutesDifference < 1) {
    return "Just now";
  } else if (minutesDifference === 1) {
    return "1 minute ago";
  } else if (minutesDifference < 60) {
    return `${minutesDifference} mins ago`;
  } else {
    const hoursDifference = Math.floor(minutesDifference / 60);
    if (hoursDifference === 1) {
      return "1 hour ago";
    } else if (hoursDifference < 24) {
      return `${hoursDifference} hours ago`;
    } else {
      const daysDifference = Math.floor(hoursDifference / 24);
      if (daysDifference === 1) {
        return "1 day ago";
      } else if (daysDifference <= 7) {
        return `${daysDifference} days ago`;
      } else {
        const uploadDate = date.toLocaleDateString();
        return uploadDate;
      }
    }
  }
};

export const handleKeyDown = (e) => {
  if (e.key === "e" || e.key === "E") {
    e.preventDefault();
  }
};

export const handleDragOver = (setIsDragging) => (e) => {
  e.preventDefault();
  setIsDragging(true);
};

export const handleDragEnter = (setIsDragging) => (e) => {
  e.preventDefault();
  setIsDragging(true);
};

export const handleDragLeave = (setIsDragging) => (e) => {
  e.preventDefault();
  setIsDragging(false);
};

// export const comparePasswords = async (inputPassword, hashedPassword) => {
//   return await bcrypt.compare(inputPassword, hashedPassword);
// };
export const isTokenExpired = (expiration) => {
  if (!expiration) {
    return false;
  }
  const currentTimestamp = Math.floor(Date.now() / 1000);
  return currentTimestamp >= expiration;
};

