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
import { useEffect, useRef, useState } from "react";

const Board = () => {
  return (
    <div className="relative w-full h-[calc(100%-80px)] min-h-[500px] bg-gray-100 rounded-xl p-2 border border-gray-200">
      <ScalesAndAvatars />
    </div>
  );
};

export default Board;

const ScalesAndAvatars = () => {
  const TOTAL_SCALES = 27;
  const { avatars, setAvatars } = useGlobals();
  const tallestAvatar = [...avatars].sort((a, b) => b.height - a.height)[0];
  const tallestAvatarHeight = Math.max(tallestAvatar?.height || 285, 285);
  const [height, setHeight] = useState(tallestAvatarHeight * 1.25);
  const delta = height / TOTAL_SCALES;
  const [avatarsLength, setAvatarsLength] = useState(avatars.length);

  const boardRef = useRef<HTMLDivElement>(null);
  const avatarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boardRef.current && avatarsRef.current) {
      const boardWidth = boardRef.current.clientWidth;
      const avatarsWidth =
        avatarsRef.current?.querySelector(".avatarsContainer")?.clientWidth ||
        0;
      const added = avatars.length > avatarsLength;
      const removed = avatars.length < avatarsLength;

      if (added && avatarsWidth + 100 > boardWidth) {
        setHeight(height * 1.25);
      } else if (removed && height > tallestAvatarHeight * 1.25) {
        setHeight(height * 0.9);
      }
    }
    setAvatarsLength(avatars.length);
  }, [avatars.length]);

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
          className="avatarsContainer absolute left-1/2 -translate-x-1/2 w-fit h-[calc(100%-40px)] flex items-end justify-center gap-1 z-[20] empty:hidden overflow-x-scroll bottom-0 pb-5"
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
  const height = (avatar.height / boardHeight) * 100;
  const { removeAvatar, setSelectedAvatar, setSelectedScreen } = useGlobals();
  return (
    <Reorder.Item
      as="div"
      value={avatar}
      className="relative min-w-fit order-none [&:hover_.edit-avatar]:flex"
      style={{ height: `${height}%` }}
    >
      <div className="edit-avatar absolute -top-[81px] left-0 w-full flex-col items-center text-[10px] hidden">
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
