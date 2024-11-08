"use client";
import AddPerson from "@/components/controls/AddPerson";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { useGlobals } from "@/contexts/GlobalContext";

export default function Home() {
  const { selectedScreen } = useGlobals();
  return (
    <main className="p-2.5 space-y-2.5 flex flex-col h-screen items-stretch">
      <Header />
      <div className="flex gap-2.5 h-full">
        <NavBar />
        <div className="w-full max-w-[300px] bg-white rounded-2xl shadow-sm p-4 border border-gray-200">
          {screens[selectedScreen as keyof typeof screens]}
        </div>
      </div>
    </main>
  );
}

const screens = {
  "Add Person": <AddPerson />,
  Celebrities: <div>Celebrities</div>,
  Objects: <div>Objects</div>,
  Image: <div>Image</div>,
};
