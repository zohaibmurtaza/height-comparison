import clsx from "clsx";
import React from "react";

const SectionTitle = ({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <h1 className={clsx("text-base font-medium", className)} onClick={onClick}>
      {children}
    </h1>
  );
};

export default SectionTitle;
