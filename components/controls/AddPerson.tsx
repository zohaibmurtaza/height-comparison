"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Colors from "@/components/Colors";
import TabStyleRadio from "@/components/ui/TabStyleRadio";
import AvatarSelector from "@/components/AvatarSelector";
import HeightInput from "@/components/HeightInput";
import { useGlobals } from "@/contexts/GlobalContext";
import toast from "react-hot-toast";
import { v4 } from "uuid";
import Input from "@/components/ui/Input";
import Message from "../ui/Message";
import { AvatarCategory, Gender, ItemType } from "@/misc/enums";
import { colors } from "@/misc/data";
import { getAnonymouseAvatar } from "@/utils/getAnonymouseAvatar";

interface AddPersonData {
  gender: Gender;
  unit: "cm" | "ft";
  displayAvatar: boolean;
  avatar: string | null;
  color: string | null;
  height: number;
  name: string;
  avatarCategory: AvatarCategory;
}

const AddPerson = () => {
  const { avatarCounts, addAvatar } = useGlobals();
  const [data, setData] = useState<AddPersonData>({
    gender: Gender.MALE,
    unit: "cm",
    displayAvatar: true,
    avatar: null,
    color: null,
    height: 0,
    name: "",
    avatarCategory: AvatarCategory.ADULT,
  });

  const setState = (
    key: keyof AddPersonData,
    value: AddPersonData[keyof AddPersonData]
  ) => {
    setData({ ...data, [key]: value });
  };

  const handleAddAvatar = () => {
    if (!data.height) {
      toast.error("Please enter height");
      return;
    }
    addAvatar({
      id: v4(),
      name: data?.name || "Unknown",
      avatar: data.avatar || getAnonymouseAvatar(data.height, data.gender),
      gender: data.gender,
      color: data.color || colors[Math.floor(Math.random() * colors.length)],
      height: data.height,
      unit: data.unit,
      type: ItemType.PERSON,
    });
  };
  return (
    <div className="w-full min-h-full space-y-6">
      <div className="w-full flex items-center justify-center gap-2">
        <TabStyleRadio
          options={Object.values(Gender)}
          value={data.gender}
          className="capitalize w-full"
          onChange={(gender) => setState("gender", gender)}
        />
        <TabStyleRadio
          options={Object.values(AvatarCategory)}
          value={data.avatarCategory}
          className="capitalize w-full"
          onChange={(avatarCategory) =>
            setState("avatarCategory", avatarCategory)
          }
        />
      </div>

      {/* Height */}
      <div className="flex items-stretch justify-between gap-2 w-full">
        <HeightInput
          height={data.height}
          unit={data.unit}
          onChange={(height) => setState("height", height)}
        />
        {/* Type */}
        <TabStyleRadio
          options={["cm", "ft"]}
          value={data.unit}
          onChange={(unit) => setState("unit", unit)}
          className="min-w-[100px] min-h-[50px]"
        />
      </div>

      <Input
        name="name"
        placeholder="Name"
        value={data.name}
        onChange={(value) => setState("name", value)}
      />

      {/* Color */}
      <Colors
        selectedColor={data.color || "#fff"}
        onChange={(color) => setState("color", color)}
      />

      {/* Select Avatar */}
      <AvatarSelector
        gender={data.gender}
        avatarCategory={data.avatarCategory}
        selectedAvatar={data.avatar}
        onAvatarChange={(avatar) => setState("avatar", avatar)}
      />
      <hr className="border-gray-200" />
      {avatarCounts.person < 10 ? (
        <Button onClick={handleAddAvatar}>Add Person</Button>
      ) : (
        <Message variant="error">
          Max 12 people at a time. Remove one to add another.
        </Message>
      )}
    </div>
  );
};

export default AddPerson;
