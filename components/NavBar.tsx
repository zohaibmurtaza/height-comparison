"use client";

import { useGlobals } from "@/contexts/GlobalContext";
import { cn } from "@/misc/utils";
import { BiSolidDog } from "react-icons/bi";
import {
  BsBox,
  BsBuilding,
  BsImage,
  BsPersonFillAdd,
  BsPersonRaisedHand,
} from "react-icons/bs";
import { ImTv } from "react-icons/im";
import { MdCatchingPokemon } from "react-icons/md";

const NavBar = ({ className }: { className?: string }) => {
  const { selectedScreen, setSelectedScreen } = useGlobals();
  return (
    <nav
      className={`md:h-full w-full bg-white rounded-2xl shadow-sm p-1 pb-0 md:pb-0 md:space-y-4 border border-gray-200 flex flex-row justify-start items-between z-20 overflow-x-auto min-h-fit ${className}`}
    >
      {screens.map(({ title, icon, hideOnMobile }, index) => (
        <span
          key={index}
          onClick={() => setSelectedScreen(title)}
          className={`flex flex-col justify-center items-center gap-2 pb-2 pt-3 px-6 h-full !mt-0 border-b border-transparent transition-all duration-300 cursor-pointer hover:text-primary hover:border-primary/40 ${cn(
            selectedScreen === title && "!text-primary !border-primary",
            hideOnMobile && "hidden md:flex"
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
  { title: "Celebrities", icon: <BsPersonRaisedHand /> },
  { title: "Fictional", icon: <ImTv /> },
  { title: "Objects", icon: <BsBox /> },
  { title: "Buildings", icon: <BsBuilding /> },
  { title: "Animals", icon: <BiSolidDog /> },
  { title: "Pokemon", icon: <MdCatchingPokemon />, hideOnMobile: true },
  { title: "Image", icon: <BsImage />, hideOnMobile: true },
];
