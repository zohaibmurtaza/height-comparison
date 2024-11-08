import clsx from "clsx";
import React from "react";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ className, children, onClick }: ButtonProps) => {
  return (
    <button
      className={clsx("w-full rounded-xl bg-primary text-white p-3", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
