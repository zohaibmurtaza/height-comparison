import clsx from "clsx";
import React from "react";

interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const Input = ({
  name = "",
  type = "text",
  placeholder = "",
  value = "",
  className = "",
  onChange = () => {},
}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={clsx(
        `w-full rounded-lg p-2 py-3 border border-gray-200`,
        className
      )}
    />
  );
};

export default Input;
