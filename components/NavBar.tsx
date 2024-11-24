"use client";

import { useGlobals } from "@/contexts/GlobalContext";
import clsx from "clsx";
import { BiSolidDog } from "react-icons/bi";
import {
  BsBox,
  BsBuilding,
  BsImage,
  BsPersonFillAdd,
  BsStars,
} from "react-icons/bs";

const NavBar = () => {
  const { selectedScreen, setSelectedScreen } = useGlobals();
  return (
    <nav className="md:h-full w-auto bg-white rounded-2xl shadow-sm py-5 lg:pr-2 md:pl-0 md:space-y-4 border border-gray-200 sticky top-2 flex flex-row md:flex-col items-stretch z-20">
      {screens.map(({ title, icon }, index) => (
        <span
          key={index}
          onClick={() => setSelectedScreen(title)}
          className={`flex flex-col justify-center items-center gap-2 p-2 pl-3 h-full md:h-auto w-full border-none md:border-l-4 border-transparent transition-all duration-300 cursor-pointer hover:text-primary hover:border-primary/40 ${clsx(
            selectedScreen === title && "!text-primary !border-primary"
          )}`}
        >
          {icon}
          <span className="text-xs text-center">{title}</span>
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
  { title: "Buildings", icon: <BsBuilding /> },
  { title: "Animals", icon: <BiSolidDog /> },
  { title: "Image", icon: <BsImage /> },
];
