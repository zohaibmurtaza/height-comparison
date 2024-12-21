"use client";

import { useGlobals } from "@/contexts/GlobalContext";
import { cmToFtAndInch } from "@/utils/HeightConversion";
import clsx from "clsx";
import SvgInline from "@/components/SVGInline";
import { Avatar as AvatarType } from "@/misc/interfaces";
import { ItemType } from "@/misc/enums";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BiSolidEdit } from "react-icons/bi";
import { Reorder } from "framer-motion";
import { useRef } from "react";
const Board = () => {
  return (
    <div className="relative w-full h-[calc(100%-80px)] min-h-[500px] bg-gray-100 rounded-xl p-2 border border-gray-200 overflow-hidden">
      <ScalesAndAvatars />
    </div>
  );
};

export default Board;

const TOTAL_SCALES = 27;

const ScalesAndAvatars = () => {
  const { avatars, setAvatars, scalingFactor } = useGlobals();
  const tallestAvatarHeight = Math.max(
    ...avatars.map((avatar) => avatar.height),
    285
  );
  const height = tallestAvatarHeight * scalingFactor;
  const delta = height / TOTAL_SCALES;

  const boardRef = useRef<HTMLDivElement>(null);
  const avatarsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={boardRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-10px)] h-[calc(100%-10px)] rounded-lg overflow-hidden"
      >
        <div className="w-full flex justify-between items-center font-bold">
          <span>cm</span>
          <span>Height Comparison Chart</span>
          <span>ft</span>
        </div>
        {Array.from({ length: TOTAL_SCALES - 1 }).map((_, index) => {
          const cm = delta * (TOTAL_SCALES - index - 3);
          const ftIn = cmToFtAndInch(cm);
          return (
            <div
              key={index}
              className={`w-full h-[calc(100%/27)] border-b flex justify-between items-center ${clsx(
                cm.toFixed(0) === "0" ? "border-primary" : "border-gray-200"
              )}`}
            >
              <span className="text-xs">{cm.toFixed(0)}</span>
              <span className="text-xs">{`${ftIn.ft}' ${ftIn.in}"`}</span>
            </div>
          );
        })}
      </div>
      <div ref={avatarsRef}>
        <Reorder.Group
          axis="x"
          as="div"
          values={avatars}
          onReorder={setAvatars}
          className="avatarsContainer absolute left-1/2 -translate-x-1/2 w-full max-w-[calc(100%-100px)] overflow-x-scroll h-[calc(100%-40px)] flex items-end justify-center gap-1 z-[20] empty:hidden bottom-0 pb-[18px]"
        >
          {avatars.map((avatar) => (
            <Avatar key={avatar.id} avatar={avatar} boardHeight={height} />
          ))}
        </Reorder.Group>
      </div>
    </>
  );
};

const Avatar = ({
  avatar,
  boardHeight,
}: {
  avatar: AvatarType;
  boardHeight: number;
}) => {
  const ftIn = cmToFtAndInch(avatar.height);
  const height =
    (avatar.height / (boardHeight - boardHeight / TOTAL_SCALES - 24)) * 100;
  const { removeAvatar, setSelectedAvatar, setSelectedScreen } = useGlobals();
  return (
    <Reorder.Item
      as="div"
      value={avatar}
      className="relative min-w-fit order-none"
      style={{ height: `${height}%` }}
    >
      <div
        className={`edit-avatar absolute -top-[78px] left-0 w-full flex-col items-center text-[10px] flex ${
          avatar.weight ? "-top-[92px]" : "-top-[78px]"
        }`}
      >
        <div className="border border-gray-200 bg-white rounded-md flex items-center">
          {avatar.type === ItemType.PERSON && (
            <BiSolidEdit
              size={30}
              className="cursor-pointer p-2 border-r border-gray-200"
              onClick={() => {
                setSelectedAvatar(avatar.id);
                setSelectedScreen("Edit Persons");
              }}
            />
          )}
          <IoIosCloseCircleOutline
            size={30}
            className="cursor-pointer p-2"
            onClick={() => removeAvatar(avatar.id)}
          />
        </div>

        <h2 className="text-[10px] whitespace-nowrap font-semibold">
          {avatar.name}
        </h2>
        <h2 className="text-[10px] whitespace-nowrap">
          {Math.round(avatar.height * 100) / 100} cm
        </h2>
        {avatar.weight ? (
          <h2 className="text-[10px] whitespace-nowrap">{avatar.weight} kg</h2>
        ) : null}
        <h2 className="text-[10px] whitespace-nowrap">{`${ftIn.ft}ft ${ftIn.in}in`}</h2>
        <hr className="w-full border-gray-500" />
      </div>
      {avatar.type === "person" ? (
        <SvgInline url={avatar.avatar} fill={avatar.color} />
      ) : (
        <img
          src={avatar.avatar}
          alt={avatar.name}
          width={200}
          height={400}
          style={{ fill: avatar.color || "#000" }}
          className="h-full w-fit min-w-fit"
          draggable={false}
        />
      )}
    </Reorder.Item>
  );
};
