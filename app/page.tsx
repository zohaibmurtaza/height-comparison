"use client";
import AddPerson from "@/components/controls/AddPerson";
import Board from "@/components/controls/Board";
import AddItems from "@/components/controls/AddItems";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { useGlobals } from "@/contexts/GlobalContext";
import AddImage from "@/components/controls/AddImage";
import BoardUtilities from "@/components/controls/BoardUtilities";
import EditPersons from "@/components/controls/EditPersons";
import Celebrities from "@/components/controls/Celebrities";
import { ItemType } from "@/misc/enums";
import AddPokemon from "@/components/controls/AddPokemon";
import { BsImage } from "react-icons/bs";
import { cn } from "@/misc/utils";

export default function Home() {
  const { selectedScreen, setSelectedScreen } = useGlobals();

  // Define the screens inside the component
  const screens = {
    "Add Person": <AddPerson key="add-person" />,
    "Edit Persons": <EditPersons key="edit-persons" />,
    Celebrities: <Celebrities key="celebrities" category="Celebrities" />,
    Fictional: <Celebrities key="fictional" category="Fictional" />,
    Objects: <AddItems type={ItemType.OBJECT} key="add-items-object" />,
    Buildings: <AddItems type={ItemType.BUILDING} key="add-items-building" />,
    Animals: <AddItems type={ItemType.ANIMAL} key="add-items-animal" />,
    Pokemon: <AddPokemon key="add-items-pokemon" />,
    Image: <AddImage key="add-image" />,
  };

  return (
    <main className="p-2.5 space-y-2.5 flex flex-col h-screen items-stretch">
      <Header />
      <NavBar className="hidden lg:flex z-[9999]" />
      <div className="flex flex-col lg:flex-row gap-2.5  h-fit lg:min-h-full relative z-10">
        <div className="w-full h-full lg:max-w-[400px] bg-white rounded-2xl shadow-sm p-4 border border-gray-200 overflow-y-auto">
          {screens[selectedScreen as keyof typeof screens]}
        </div>
        <div className="flex flex-col flex-grow gap-2 order-first lg:order-none">
          <BoardUtilities />
          <Board />
          <span
            onClick={() => setSelectedScreen("Image")}
            className={`flex md:hidden w-full justify-center items-center gap-2 pb-4 pt-4 px-6 h-full !mt-0 border-b border-transparent bg-white rounded-2xl shadow-sm p-4 border border-gray-200 transition-all duration-300 cursor-pointer hover:text-primary hover:border-primary/40 ${cn(
              selectedScreen === "Image" && "!text-primary !border-primary"
            )}`}
          >
            <BsImage />
            <span className="text-xs text-center"> Add Image</span>
          </span>
          <NavBar className="lg:hidden" />
        </div>
      </div>
    </main>
  );
}
