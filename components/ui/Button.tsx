import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="w-full rounded-xl bg-primary text-white p-3"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
