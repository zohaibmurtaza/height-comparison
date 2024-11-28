"use client";

import { useState } from "react";
// import Switch from "@/components/ui/Switch";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
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
    if (
      !data.avatar ||
      !data.color ||
      !data.height ||
      !data.unit ||
      !data.name
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    addAvatar({
      id: v4(),
      name: data.name,
      avatar: data.avatar,
      color: data.color,
      height: data.height,
      unit: data.unit,
      type: ItemType.PERSON,
    });
  };
  return (
    <div className="w-full min-h-full space-y-6">
      <TabStyleRadio
        options={Object.values(Gender)}
        value={data.gender}
        className="capitalize"
        onChange={(gender) => setState("gender", gender)}
      />

      <TabStyleRadio
        options={Object.values(AvatarCategory)}
        value={data.avatarCategory}
        className="capitalize"
        onChange={(avatarCategory) =>
          setState("avatarCategory", avatarCategory)
        }
      />

      {/* Type */}
      <div className="flex items-center justify-between gap-2 w-full">
        <SectionTitle>Unit</SectionTitle>
        <TabStyleRadio
          options={["cm", "ft"]}
          value={data.unit}
          onChange={(unit) => setState("unit", unit)}
          className="w-[100px]"
        />
      </div>

      {/* Height */}
      <HeightInput
        height={data.height}
        unit={data.unit}
        onChange={(height) => setState("height", height)}
      />

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

      {/* Display Avatar */}
      {/* <div className="w-full rounded-xl border p-3 py-4 border-gray-200">
        <div className="flex items-center justify-between gap-1.5">
          <h1 className="text-base font-medium leading-none">Display Avatar</h1>
          <Switch
            value={data.displayAvatar}
            onChange={() => setState("displayAvatar", !data.displayAvatar)}
          />
        </div>
        <span className="text-xs font-light">
          Lorem Ipsum is simply dummy text.
        </span>
      </div> */}

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
