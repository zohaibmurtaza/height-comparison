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
import { MdCatchingPokemon } from "react-icons/md";

const NavBar = ({ className }: { className?: string }) => {
  const { selectedScreen, setSelectedScreen } = useGlobals();
  return (
    <nav
      className={`md:h-full w-full bg-white rounded-2xl shadow-sm p-1 pb-0 md:pb-0 md:space-y-4 border border-gray-200 sticky top-2 flex flex-row justify-center items-between z-20 overflow-x-auto min-h-fit ${className}`}
    >
      {screens.map(({ title, icon }, index) => (
        <span
          key={index}
          onClick={() => setSelectedScreen(title)}
          className={`flex flex-col justify-center items-center gap-2 pb-2 pt-3 px-6 h-full !mt-0 border-b border-transparent transition-all duration-300 cursor-pointer hover:text-primary hover:border-primary/40 ${clsx(
            selectedScreen === title && "!text-primary !border-primary",
            title === "Pokemon" && "hidden md:flex"
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
  { title: "Fictional", icon: <BsStars /> },
  { title: "Objects", icon: <BsBox /> },
  { title: "Buildings", icon: <BsBuilding /> },
  { title: "Animals", icon: <BiSolidDog /> },
  { title: "Pokemon", icon: <MdCatchingPokemon /> },
  { title: "Image", icon: <BsImage /> },
];
