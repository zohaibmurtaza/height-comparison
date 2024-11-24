import React, { useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import TabStyleRadio from "./ui/TabStyleRadio";
import Image from "next/image";
import { Gender, BodyType } from "@/misc/enums";

interface AvatarSelectorProps {
  gender: Gender;
  selectedAvatar: string | null;
  onAvatarChange: (avatar: string) => void;
}

const TOTAL_AVATARS = 9;

const AvatarSelector = ({
  selectedAvatar,
  gender,
  onAvatarChange,
}: AvatarSelectorProps) => {
  const [bodyType, setBodyType] = useState<string>(BodyType.ECTOMORPH);
  return (
    <div className="space-y-2">
      <SectionTitle>Select Avatar</SectionTitle>
      <TabStyleRadio
        options={Object.values(BodyType)}
        value={bodyType}
        onChange={(bodyType) => setBodyType(bodyType)}
        className="text-[12px] capitalize"
      />

      {/* Avatars */}
      <div className="rounded-lg border-gray-200 p-5 border grid grid-cols-4 gap-3 min-h-[200px] justify-items-center items-baseline">
        {Array(TOTAL_AVATARS)
          .fill(null)
          .map((_, index) => {
            const avatar = `/images/persons/${gender}/${bodyType}/person-${
              index + 1
            }.svg`;
            return (
              <Image
                key={index}
                src={avatar}
                alt="avatar"
                width={100}
                height={100}
                className={`w-auto max-h-[80px] h-auto cursor-pointer py-2 px-3 rounded-md ${
                  selectedAvatar === avatar && "bg-primary"
                }`}
                onClick={() => onAvatarChange(avatar)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default AvatarSelector;
