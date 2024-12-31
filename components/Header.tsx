import Logo from "@/components/Logo";
import Link from "next/link";
import { BsDiscord } from "react-icons/bs";
import { routes } from "@/misc/routes";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-3 rounded-2xl bg-white shadow-sm border border-gray-200">
      <Logo />
      <nav className="hidden md:flex items-center gap-6">
        {Object.values(routes).map((route, index) => (
          <Link key={index} href={route.path} className="text-base font-medium">
            {route.title}
          </Link>
        ))}
      </nav>
      <Link
        href="#"
        className="font-medium text-primary text-sm md:text-lg bg-primary/10 rounded-xl px-2 md:px-4 py-3 flex items-center gap-2"
      >
        <BsDiscord />
        Join Reddit
      </Link>
    </header>
  );
};

export default Header;
