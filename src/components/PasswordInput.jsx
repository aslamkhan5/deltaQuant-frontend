import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const PasswordInput = (props) => {
  return (
    <div
      className={
        props?.disabled
          ? `${props.className} disabled-password-input`
          : props.className
      }
    >
      <input
        type={props.showPassword ? "text" : "password"}
        name={props.name}
        placeholder={props.placeholder}
        className="password-input"
        onChange={props.onChange}
        autoComplete={props.autoComplete}
        disabled={props?.disabled}
        value={props.value}
      />
      <button
        className="btn eyeflash"
        type="button"
        onClick={props?.handleTogglePassword}
      >
        {props.showPassword ? (
          <FaEye className="eye-inner" />
        ) : (
          <FaEyeSlash className="eye-inner" />
        )}
      </button>
    </div>
  );
};
export default PasswordInput;
