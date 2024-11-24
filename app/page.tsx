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

export default function Home() {
  const { selectedScreen } = useGlobals();

  // Define the screens inside the component
  const screens = {
    "Add Person": <AddPerson key="add-person" />,
    "Edit Persons": <EditPersons key="edit-persons" />,
    Celebrities: <Celebrities key="celebrities" />,
    Objects: <AddItems type={ItemType.OBJECT} key="add-items-object" />,
    Buildings: <AddItems type={ItemType.BUILDING} key="add-items-building" />,
    Animals: <AddItems type={ItemType.ANIMAL} key="add-items-animal" />,
    Image: <AddImage key="add-image" />,
  };

  return (
    <main className="p-2.5 space-y-2.5 flex flex-col h-screen items-stretch">
      <Header />
      <div className="flex flex-col md:flex-row gap-2.5  h-fit md:min-h-full">
        <NavBar />
        <div className="w-full h-full md:max-w-[300px] bg-white rounded-2xl shadow-sm p-4 border border-gray-200 overflow-y-auto">
          {screens[selectedScreen as keyof typeof screens]}
        </div>
        <div className="flex flex-col-reverse md:flex-col flex-grow gap-2 order-first md:order-none">
          <BoardUtilities />
          <Board />
        </div>
      </div>
    </main>
  );
}
