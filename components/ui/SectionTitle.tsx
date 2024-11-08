import clsx from "clsx";
import React from "react";

const SectionTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h1 className={clsx("text-base font-medium", className)}>{children}</h1>
  );
};

export default SectionTitle;
