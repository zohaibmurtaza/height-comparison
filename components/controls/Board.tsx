"use client";

import { useGlobals } from "@/contexts/GlobalContext";
import { cmToFtAndInch } from "@/utils/HeightConversion";
import clsx from "clsx";
import Image from "next/image";
import SvgInline from "../SVGInline";
import { LuPen, LuTrash2 } from "react-icons/lu";

const Board = () => {
  return (
    <div className="relative w-full h-full bg-gray-100 rounded-xl p-2 border border-gray-200">
      <ScalesAndAvatars />
    </div>
  );
};

export default Board;

const ScalesAndAvatars = () => {
  const TOTAL_SCALES = 27;
  const { avatars } = useGlobals();
  const tallestAvatar = avatars.sort((a, b) => b.height - a.height)[0];
  const tallestAvatarHeight = Math.max(tallestAvatar?.height || 285, 285);
  const height = tallestAvatarHeight * 1.21;
  const delta = height / TOTAL_SCALES;
  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-10px)] h-[calc(100%-10px)] rounded-lg">
        <div className="w-full flex justify-between items-center font-bold">
          <span>cm</span>
          <span>Height Comparison</span>
          <span>ft</span>
        </div>
        {Array.from({ length: TOTAL_SCALES - 1 }).map((_, index) => {
          const cm = delta * (TOTAL_SCALES - index - 3);
          const ftIn = cmToFtAndInch(cm);
          console.log(ftIn);
          return (
            <div
              key={index}
              className={`w-full h-[calc(100%/27)] border-b flex justify-between items-center ${clsx(
                cm.toFixed(0) === "0" ? "border-primary" : "border-gray-200"
              )}`}
            >
              <span>{cm.toFixed(0)}</span>
              <span>{`${ftIn.ft}' ${ftIn.in}"`}</span>
            </div>
          );
        })}
      </div>
      <div
        className="absolute left-0 w-full h-full flex items-end justify-center z-20"
        style={{ bottom: delta * 3 }}
      >
        {avatars.map((avatar, index) => (
          <Avatar key={index} avatar={avatar} boardHeight={height} />
        ))}
      </div>
    </>
  );
};

const Avatar = ({
  avatar,
  boardHeight,
}: {
  avatar: Avatar;
  boardHeight: number;
}) => {
  const ftIn = cmToFtAndInch(avatar.height);
  const height = (avatar.height / boardHeight) * 100;
  const { avatars, setAvatars } = useGlobals();
  return (
    <div className="relative" style={{ height: `${height}%` }}>
      <div className="absolute -top-[75px] left-0 w-full flex flex-col items-center">
        <div className="border border-gray-200 bg-white rounded-md flex items-center gap-3 p-1">
          <LuPen size={15} className="cursor-pointer" />
          <LuTrash2
            size={15}
            onClick={() => setAvatars(avatars.filter((a) => a !== avatar))}
            className="cursor-pointer"
          />
        </div>
        <h2>{avatar.height.toFixed(0)} cm</h2>
        <h2>{`${ftIn.ft}ft ${ftIn.in}in`}</h2>
        <hr className="w-full border-gray-500" />
      </div>
      {/* <Image
        src={avatar.avatar}
        alt="avatar"
        width={200}
        height={400}
        style={{ fill: avatar.color || "#000" }}
        className="h-full"
      /> */}
      <SvgInline url={avatar.avatar} fill={avatar.color} />
    </div>
  );
};
