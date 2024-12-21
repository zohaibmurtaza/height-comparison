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
import { AvatarCategory, BodyType, Gender, ItemType } from "@/misc/enums";
import { colors } from "@/misc/data";
import { getAnonymouseAvatar } from "@/utils/getAnonymouseAvatar";
import { IoMdAddCircleOutline } from "react-icons/io";
import SectionTitle from "../ui/SectionTitle";

interface AddPersonData {
  gender: Gender;
  unit: "cm" | "ft";
  displayAvatar: boolean;
  avatar: string | null;
  color: string | null;
  height: number;
  name: string;
  avatarCategory: AvatarCategory;
  weight: number;
  bodyType: BodyType;
}

const AddPerson = () => {
  const { avatars, addAvatar } = useGlobals();
  const [data, setData] = useState<AddPersonData>({
    gender: Gender.MALE,
    unit: "ft",
    displayAvatar: true,
    avatar: null,
    color: null,
    height: 0,
    name: "",
    avatarCategory: AvatarCategory.ADULT,
    bodyType: BodyType.ECTOMORPH,
    weight: 0,
  });

  const setState = (
    key: keyof AddPersonData,
    value: AddPersonData[keyof AddPersonData]
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
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
      category: data.avatarCategory,
      type: ItemType.PERSON,
      weight: data.weight,
    });
  };
  return (
    <div className="w-full min-h-full space-y-3">
      <div className="flex items-center justify-between gap-2">
        <TabStyleRadio
          options={Object.values(Gender)}
          value={data.gender}
          onChange={(gender) => {
            setState("gender", gender);
            setState("avatarCategory", AvatarCategory.ADULT);
          }}
          className="capitalize w-2/3"
        />
        <TabStyleRadio
          options={[AvatarCategory.CHILD, AvatarCategory.PET]}
          value={data.avatarCategory}
          className="capitalize w-1/3"
          onChange={(avatarCategory) =>
            setState("avatarCategory", avatarCategory)
          }
        />
      </div>

      {/* Height */}
      <div className="flex items-stretch justify-between gap-2 w-full max-h-[45px]">
        <HeightInput
          height={data.height}
          unit={data.unit}
          onChange={(height) => setState("height", height)}
        />
        {/* Type */}
        <TabStyleRadio
          options={["ft", "cm"]}
          value={data.unit}
          onChange={(unit) => setState("unit", unit)}
          className="min-w-[100px]"
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <Input
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={(value) => setState("name", value)}
        />
        <Input
          name="weight"
          placeholder="Weight (kg)"
          value={data.weight === 0 ? "" : data.weight}
          type="number"
          onChange={(value) => setState("weight", value)}
          className="w-2/3"
        />
      </div>

      {/* Color */}
      <Colors
        selectedColor={data.color || "#fff"}
        onChange={(color) => setState("color", color)}
      />

      <SectionTitle>Gender</SectionTitle>
      {data.avatarCategory === AvatarCategory.CHILD && (
        <TabStyleRadio
          options={Object.values(Gender)}
          value={data.gender}
          onChange={(gender) => setState("gender", gender)}
          className="capitalize w-full"
        />
      )}
      {/* Select Avatar */}
      <AvatarSelector
        gender={data.gender}
        avatarCategory={data.avatarCategory}
        selectedAvatar={data.avatar}
        onAvatarChange={(avatar) => setState("avatar", avatar)}
        onGenderChange={(gender) => setState("gender", gender)}
      />
      {avatars.length < MAX_PERSONS ? (
        <Button
          onClick={handleAddAvatar}
          className="flex items-center gap-2 justify-center"
        >
          Add
          <IoMdAddCircleOutline />
        </Button>
      ) : (
        <Message variant="error">
          Max {MAX_PERSONS} people at a time. Remove one to add another.
        </Message>
      )}
    </div>
  );
};

export default AddPerson;

const MAX_PERSONS = 6;
