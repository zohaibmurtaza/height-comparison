"use client";
import { LuRedo2, LuUndo2 } from "react-icons/lu";
import Button from "../ui/Button";
import { IoMdShare } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { TbEditCircle } from "react-icons/tb";
import { useGlobals } from "@/contexts/GlobalContext";

const BoardUtilities = () => {
  const { undo, redo, canUndo, canRedo, setAvatars, setSelectedScreen } =
    useGlobals();
  return (
    <div className="flex justify-between items-center z-20 relative">
      <div className="flex gap-1 items-center">
        <LuUndo2
          size={45}
          className={`bg-white rounded-xl p-3 border border-gray-200 cursor-pointer ${
            !canUndo ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={undo}
        />
        <LuRedo2
          size={45}
          className={`bg-white rounded-xl p-3 border border-gray-200 cursor-pointer ${
            !canRedo ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={redo}
        />
      </div>
      <div className="flex items-center gap-1">
        <Button
          className="bg-white !text-black border border-gray-200 flex items-center gap-2"
          onClick={() => setAvatars([])}
        >
          Clear
          <RxCrossCircled size={15} />
        </Button>
        <Button
          className="bg-white !text-black border border-gray-200 flex items-center gap-2"
          onClick={() => setSelectedScreen("Edit Persons")}
        >
          Edit
          <TbEditCircle size={15} />
        </Button>
      </div>
      <Button className="!w-fit flex items-center gap-1">
        Share
        <IoMdShare size={15} />
      </Button>
    </div>
  );
};

export default BoardUtilities;
