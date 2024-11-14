"use client";

import { useState } from "react";
import Switch from "@/components/ui/Switch";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import Colors from "@/components/Colors";
import TabStyleRadio from "@/components/ui/TabStyleRadio";
import AvatarSelector from "../AvatarSelector";
import HeightInput from "../HeightInput";
import { useGlobals } from "@/contexts/GlobalContext";
import toast from "react-hot-toast";

interface AddPersonData {
  gender: "Male" | "Female";
  unit: "cm" | "ft";
  displayAvatar: boolean;
  bodyType: "Ectomorph" | "Mesomorph" | "Endomorph";
  avatar: string | null;
  color: string | null;
  height: number;
}

const AddPerson = () => {
  const { avatars, setAvatars } = useGlobals();
  const [data, setData] = useState<AddPersonData>({
    gender: "Male",
    unit: "cm",
    displayAvatar: true,
    bodyType: "Ectomorph",
    avatar: null,
    color: null,
    height: 0,
  });

  console.log("Add Person Data", data);

  const setState = (key: keyof AddPersonData, value: any) => {
    setData({ ...data, [key]: value });
  };

  const handleAddAvatar = () => {
    if (!data.avatar || !data.color || !data.height || !data.unit) {
      toast.error("Please fill all the fields");
      return;
    }
    setAvatars([
      ...avatars,
      {
        avatar: data.avatar,
        color: data.color,
        height: data.height,
        unit: data.unit,
      } as Avatar,
    ]);
  };
  return (
    <div className="w-full min-h-full space-y-6">
      <TabStyleRadio
        options={["Male", "Female"]}
        value={data.gender}
        onChange={(gender) => setState("gender", gender)}
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

      {/* Color */}
      <Colors
        selectedColor={data.color || "#fff"}
        onChange={(color) => setState("color", color)}
      />

      {/* Display Avatar */}
      <div className="w-full rounded-xl border p-3 py-4 border-gray-200">
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
      </div>

      {/* Select Avatar */}
      <AvatarSelector
        bodyType={data.bodyType}
        selectedAvatar={data.avatar}
        onBodyTypeChange={(bodyType) => setState("bodyType", bodyType)}
        onAvatarChange={(avatar) => setState("avatar", avatar)}
      />
      <hr className="border-gray-200" />
      <Button onClick={handleAddAvatar}>Add Person</Button>
    </div>
  );
};

export default AddPerson;
