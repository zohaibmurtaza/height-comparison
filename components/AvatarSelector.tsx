import React, { useEffect, useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import TabStyleRadio from "./ui/TabStyleRadio";
import Image from "next/image";
import { Gender, BodyType, AvatarCategory } from "@/misc/enums";
import { RiSkipDownLine } from "react-icons/ri";

interface AvatarSelectorProps {
  gender: Gender;
  selectedAvatar: string | null;
  bodyType: BodyType;
  onAvatarChange: (avatar: string) => void;
  avatarCategory?: AvatarCategory;
  onGenderChange: (gender: Gender) => void;
  onBodyTypeChange: (bodyType: BodyType) => void;
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
  bodyType,
  avatarCategory = AvatarCategory.ADULT,
  onAvatarChange,
  onBodyTypeChange,
}: AvatarSelectorProps) => {
  const [showCount, setShowCount] = useState(INITIAL_SHOW_COUNT);
  //list of avatars in one single array
  const avatarsList = Array(TOTAL_AVATARS[avatarCategory])
    .fill(null)
    .map((_, index) => {
      return getAvatarPath(avatarCategory, gender, bodyType, index);
    });

  useEffect(() => {
    setShowCount(INITIAL_SHOW_COUNT);
  }, [avatarCategory, gender]);

  useEffect(() => {
    setShowCount(INITIAL_SHOW_COUNT);
  }, [bodyType]);

  return (
    <div>
      {avatarCategory === AvatarCategory.ADULT ? (
        <>
          <SectionTitle className="">Select Avatar</SectionTitle>
          <TabStyleRadio
            options={Object.values(BodyType)}
            value={bodyType}
            onChange={(bodyType) => onBodyTypeChange(bodyType as BodyType)}
            className="text-[12px] capitalize mb-2"
          />
        </>
      ) : null}

      {/* Avatars */}
      <div className="rounded-lg border-gray-200 p-5 border grid grid-cols-5 gap-3 max-h-[300px] min-h-[100px] justify-items-center items-baseline overflow-y-auto">
        {avatarsList.slice(0, showCount).map((avatar, index) => (
          <Image
            key={index}
            src={avatar}
            alt="avatar"
            width={100}
            height={100}
            className={`w-auto h-[80px] max-h-[80px] cursor-pointer py-2 px-3 rounded-md ${
              selectedAvatar === avatar && "bg-primary"
            }`}
            onClick={() => onAvatarChange(avatar)}
          />
        ))}
      </div>
      {showCount < avatarsList.length && (
        <div
          onClick={() =>
            setShowCount(
              showCount +
                Math.min(INITIAL_SHOW_COUNT, avatarsList.length - showCount)
            )
          }
          className="flex items-center justify-center gap-2 cursor-pointer my-3"
        >
          Load More <RiSkipDownLine size={18} />
        </div>
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
