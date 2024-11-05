import Logo from "@/components/Logo";
import Link from "next/link";
import { BsDiscord } from "react-icons/bs";
import { routes } from "@/misc/routes";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-3 rounded-2xl bg-white shadow-sm">
      <Logo />
      <nav className="flex items-center gap-6">
        {Object.values(routes).map((route, index) => (
          <Link key={index} href={route.path} className="text-base font-medium">
            {route.title}
          </Link>
        ))}
      </nav>
      <Link
        href="#"
        className="font-medium text-[#5865F2] text-lg bg-[#5865F21A] rounded-xl px-4 py-3 flex items-center gap-2"
      >
        <BsDiscord color="#5865F2" />
        Join Discord
      </Link>
    </header>
  );
};

export default Header;
