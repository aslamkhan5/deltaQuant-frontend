import React from "react";

const FormLabel = ({
  className,
  labelText,
  htmlfor,
  required,
  profileField,
}) => {
  return (
    <label htmlFor={htmlfor} className={className}>
      {labelText}
      {required && <span className="aestaric">*</span>}
      {profileField && (
        <span className="note-text">
          No special characters allowed, spaces in names will convert to dashes.
        </span>
      )}
    </label>
  );
};

export default FormLabel;
