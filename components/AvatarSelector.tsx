import React from "react";
import SectionTitle from "./ui/SectionTitle";
import TabStyleRadio from "./ui/TabStyleRadio";
import Image from "next/image";

interface AvatarSelectorProps {
  bodyType: string;
  selectedAvatar: string | null;
  onBodyTypeChange: (bodyType: string) => void;
  onAvatarChange: (avatar: string) => void;
}

const AvatarSelector = ({
  bodyType,
  selectedAvatar,
  onBodyTypeChange,
  onAvatarChange,
}: AvatarSelectorProps) => {
  return (
    <div className="space-y-2">
      <SectionTitle>Select Avatar</SectionTitle>
      <TabStyleRadio
        options={["Ectomorph", "Mesomorph", "Endomorph"]}
        value={bodyType}
        onChange={(bodyType) => onBodyTypeChange(bodyType)}
        className="text-[12px]"
      />

      {/* Avatars */}
      <div className="rounded-lg border-gray-200 p-5 border grid grid-cols-4 gap-3 min-h-[200px] justify-items-center items-baseline">
        {Array(5)
          .fill(null)
          .map((_, index) => {
            const avatar = `/images/persons/person-${index + 1}.svg`;
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
