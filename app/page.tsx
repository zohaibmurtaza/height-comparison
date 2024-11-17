"use client";
import AddPerson from "@/components/controls/AddPerson";
import Board from "@/components/controls/Board";
import AddObjects from "@/components/controls/AddObjects";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { useGlobals } from "@/contexts/GlobalContext";
import AddImage from "@/components/controls/AddImage";
import BoardUtilities from "@/components/controls/BoardUtilities";
import EditPersons from "@/components/controls/EditPersons";
import Celebrities from "@/components/controls/Celebrities";

export default function Home() {
  const { selectedScreen } = useGlobals();
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

const screens = {
  "Add Person": <AddPerson />,
  "Edit Persons": <EditPersons />,
  Celebrities: <Celebrities />,
  Objects: <AddObjects />,
  Image: <AddImage />,
};
