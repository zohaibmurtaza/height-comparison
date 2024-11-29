import Link from "next/link";
import Image from "next/image";
import React from "react";
import LogoIcon from "@/assets/logo.svg";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src={LogoIcon}
        alt="logo"
        width={194}
        height={24}
        className="w-[150px] md:w-fit"
      />
    </Link>
  );
};

export default Logo;
