import React from "react";

interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const Input = ({
  name = "",
  type = "text",
  placeholder = "",
  value = "",
  onChange = () => {},
}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg p-2 py-3 border border-gray-200"
    />
  );
};

export default Input;
