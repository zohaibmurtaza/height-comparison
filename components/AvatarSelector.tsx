import React, { useEffect, useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import TabStyleRadio from "./ui/TabStyleRadio";
import Image from "next/image";
import { Gender, BodyType, AvatarCategory } from "@/misc/enums";

interface AvatarSelectorProps {
  gender: Gender;
  selectedAvatar: string | null;
  onAvatarChange: (avatar: string) => void;
  avatarCategory?: AvatarCategory;
  onCategoryChange?: (category: AvatarCategory) => void;
}

const TOTAL_AVATARS = {
  [AvatarCategory.ADULT]: 9,
  [AvatarCategory.CHILD]: 5,
  [AvatarCategory.PET]: 3,
};

const AvatarSelector = ({
  selectedAvatar,
  gender,
  avatarCategory = AvatarCategory.ADULT,
  onAvatarChange,
}: AvatarSelectorProps) => {
  const [bodyType, setBodyType] = useState<BodyType>(BodyType.ECTOMORPH);

  useEffect(() => {
    onAvatarChange(getAvatarPath(avatarCategory, gender, bodyType, 0));
  }, [avatarCategory, gender, bodyType]);

  return (
    <div className="space-y-2">
      <SectionTitle>Select Avatar</SectionTitle>
      <TabStyleRadio
        options={Object.values(BodyType)}
        value={bodyType}
        onChange={(bodyType) => setBodyType(bodyType as BodyType)}
        className="text-[12px] capitalize"
      />

      {/* Avatars */}
      <div className="rounded-lg border-gray-200 p-5 border grid grid-cols-3 sm:grid-cols-4 gap-3 min-h-[200px] justify-items-center items-baseline">
        {Array(TOTAL_AVATARS[avatarCategory])
          .fill(null)
          .map((_, index) => {
            const avatar = getAvatarPath(
              avatarCategory || AvatarCategory.ADULT,
              gender,
              bodyType,
              index
            );
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
