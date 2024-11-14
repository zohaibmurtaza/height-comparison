"use client";

import { useGlobals } from "@/contexts/GlobalContext";
import clsx from "clsx";
import { BsBox, BsImage, BsPersonFillAdd, BsStars } from "react-icons/bs";

const NavBar = () => {
  const { selectedScreen, setSelectedScreen } = useGlobals();
  return (
    <nav className="h-full w-auto bg-white rounded-2xl shadow-sm py-5 pr-2 pl-0 space-y-4 border border-gray-200 sticky top-0">
      {screens.map(({ title, icon }, index) => (
        <span
          key={index}
          onClick={() => setSelectedScreen(title)}
          className={`flex flex-col justify-center items-center gap-2 p-2 pl-4 w-full border-l-4 border-transparent transition-all duration-300 cursor-pointer hover:text-primary hover:border-primary/40 ${clsx(
            selectedScreen === title && "!text-primary !border-primary"
          )}`}
        >
          {icon}
          <span className="text-xs">{title}</span>
        </span>
      ))}
    </nav>
  );
};

export default NavBar;

const screens = [
  { title: "Add Person", icon: <BsPersonFillAdd /> },
  { title: "Celebrities", icon: <BsStars /> },
  { title: "Objects", icon: <BsBox /> },
  { title: "Image", icon: <BsImage /> },
];
