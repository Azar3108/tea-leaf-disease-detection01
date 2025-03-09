import React from "react";

// This is the Card component
export const Card = ({ children, className }) => {
  return (
    <div className={`rounded-2xl shadow-lg p-4 bg-white ${className}`}>
      {children}
    </div>
  );
};

// This is the CardContent component
export const CardContent = ({ children, className }) => {
  return (
    <div className={`p-2 ${className}`}>
      {children}
    </div>
  );
};
