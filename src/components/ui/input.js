import React from "react";

export const Input = ({ type, onChange, className, ...props }) => {
  return (
    <input
      type={type}
      onChange={onChange}
      className={`border rounded-lg px-3 py-2 ${className}`}
      {...props}
    />
  );
};
