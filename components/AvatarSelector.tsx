import React, { useEffect, useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import TabStyleRadio from "./ui/TabStyleRadio";
import Image from "next/image";
import { Gender, BodyType, AvatarCategory } from "@/misc/enums";
import Button from "./ui/Button";
import { HiOutlineViewGridAdd } from "react-icons/hi";

interface AvatarSelectorProps {
  gender: Gender;
  selectedAvatar: string | null;
  onAvatarChange: (avatar: string) => void;
  avatarCategory?: AvatarCategory;
  onGenderChange: (gender: Gender) => void;
}

const TOTAL_AVATARS = {
  [AvatarCategory.ADULT]: 9,
  [AvatarCategory.CHILD]: 5,
  [AvatarCategory.PET]: 3,
};

const INITIAL_SHOW_COUNT = 5;

const AvatarSelector = ({
  selectedAvatar,
  gender,
  avatarCategory = AvatarCategory.ADULT,
  onAvatarChange,
  onGenderChange,
}: AvatarSelectorProps) => {
  const [showCount, setShowCount] = useState(INITIAL_SHOW_COUNT);
  //list of avatars in one single array
  const avatarsList = Object.values(BodyType).flatMap((bodyType) => {
    return Array(TOTAL_AVATARS[avatarCategory])
      .fill(null)
      .map((_, index) => {
        return {
          avatar: getAvatarPath(avatarCategory, gender, bodyType, index),
          bodyType,
        };
      });
  });

  useEffect(() => {
    setShowCount(INITIAL_SHOW_COUNT);
  }, [avatarCategory, gender]);

  return (
    <div>
      <SectionTitle>Select Avatar</SectionTitle>
      <TabStyleRadio
        options={Object.values(Gender)}
        value={gender}
        onChange={(gender) => onGenderChange(gender as Gender)}
        className="text-[12px] capitalize mb-2"
      />

      {/* Avatars */}
      <div className="rounded-t-lg border-gray-200 p-5 border grid grid-cols-4 sm:grid-cols-5 gap-3 max-h-[300px] justify-items-center items-baseline overflow-y-auto">
        {avatarsList.slice(0, showCount).map((avatar, index) => (
          <Image
            key={index}
            src={avatar.avatar}
            alt="avatar"
            width={100}
            height={100}
            className={`w-auto max-h-[80px] h-auto cursor-pointer py-2 px-3 rounded-md ${
              selectedAvatar === avatar.avatar && "bg-primary"
            }`}
            onClick={() => onAvatarChange(avatar.avatar)}
          />
        ))}
      </div>
      {showCount < avatarsList.length && (
        <Button
          onClick={() =>
            setShowCount(
              showCount +
                Math.min(INITIAL_SHOW_COUNT, avatarsList.length - showCount)
            )
          }
          className="!rounded-b-lg !rounded-t-none bg-gray-200 text-black !p-2 flex items-center justify-center gap-2"
        >
          Load More
          <HiOutlineViewGridAdd size={18} />
        </Button>
      )}
    </div>
  );
};

export default AvatarSelector;

const getAvatarPath = (
  avatarCategory: AvatarCategory,
  gender: Gender,
  bodyType: BodyType,
  index: number
) => {
  return avatarCategory === AvatarCategory.PET
    ? `/images/pets/pet-${index + 1}.svg`
    : `/images/persons/${avatarCategory}/${gender}/${bodyType}/person-${
        index + 1
      }.svg`;
};
