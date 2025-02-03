import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-auto bg-primary flex items-center justify-center p-10 mb-[100px]">
      {footerLinks.map((link) => (
        <Link key={link.title} href={link.href}>
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default Footer;

const footerLinks = [
  {
    title: "Privacy Policy",
    href: "https://heightcomparisonchart.com/privacy-policy/",
  },
  {
    title: "Terms",
    href: "https://heightcomparisonchart.com/terms/",
  },
  {
    title: "FAQ",
    href: "https://heightcomparisonchart.com/faq/",
  },
];
