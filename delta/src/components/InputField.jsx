import React from "react";

const InputField = ({
  value,
  type,
  placeholder,
  onChange,
  name,
  required,
  className,
  max,
  min,
  checked,
  disabled,
  maxLength,
  onKeyDown,
  style,
  onBlur,
}) => {
  return (
    <input
      style={style}
      className={className}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      max={max}
      min={min}
      disabled={disabled}
      maxLength={maxLength}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
};

export default InputField;
