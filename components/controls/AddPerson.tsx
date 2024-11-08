"use client";

import { useEffect, useState } from "react";
import Switch from "../ui/Switch";
import Button from "../ui/Button";
import { colors } from "@/misc/data";
import { FaCheck } from "react-icons/fa";
import { CgColorPicker } from "react-icons/cg";
import { ChromePicker, SketchPicker } from "react-color";
import SectionTitle from "../ui/SectionTitle";
import Image from "next/image";

interface AddPersonData {
  gender: "Male" | "Female";
  unit: "cm" | "ft";
  displayAvatar: boolean;
  bodyType: "Ectomorph" | "Mesomorph" | "Endomorph";
  selectedAvatar: string | null;
  selectedColor: string | null;
  height: number;
}

const AddPerson = () => {
  const [data, setData] = useState<AddPersonData>({
    gender: "Male",
    unit: "cm",
    displayAvatar: true,
    bodyType: "Ectomorph",
    selectedAvatar: null,
    selectedColor: null,
    height: 0,
  });
  const [pickedColor, setPickedColor] = useState<string | null>(null);

  const [showColorPicker, setShowColorPicker] = useState(false);

  const setState = (key: keyof AddPersonData, value: any) => {
    setData({ ...data, [key]: value });
  };

  return (
    <div className="w-full h-full space-y-6">
      <TabStyleRadio
        options={["Male", "Female"]}
        value={data.gender}
        onChange={(gender) => setState("gender", gender)}
      />

      {/* Type */}
      <div className="flex items-center justify-between gap-2 w-full">
        <SectionTitle>Type</SectionTitle>
        <TabStyleRadio
          options={["cm", "ft"]}
          value={data.unit}
          onChange={(unit) => setState("unit", unit)}
          className="w-[100px]"
        />
      </div>

      {/* Height */}
      <input
        type="number"
        className="w-full rounded-lg p-2 py-3 border border-gray-200"
        placeholder={`e.g. ${data.unit === "cm" ? "120 cm" : "4 ft"}`}
        value={data.height}
        onChange={(e) => setState("height", e.target.valueAsNumber)}
      />

      {/* Color */}
      <div className="grid grid-cols-8 gap-1.5 relative">
        {showColorPicker && (
          <ChromePicker
            className="absolute top-8 left-0 z-50"
            color={data.selectedColor || "#fff"}
            onChange={(color) => {
              setPickedColor(color.hex);
              setState("selectedColor", color.hex);
            }}
          />
        )}
        <div
          className="relative w-full aspect-square rounded-md border border-gray-300 flex items-center justify-center cursor-pointer"
          onClick={() => setShowColorPicker((prev) => !prev)}
          style={{ backgroundColor: pickedColor || "#fff" }}
        >
          <CgColorPicker
            size={18}
            className="text-gray-500 p-0.5 bg-white rounded-full"
          />
        </div>
        {colors.map((c, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-full aspect-square rounded-md cursor-pointer ${""}`}
            style={{ backgroundColor: c }}
            onClick={() => setState("selectedColor", c)}
          >
            {data.selectedColor === c && (
              <FaCheck
                className="aspect-square bg-white rounded-full p-1"
                size={20}
                color="black"
              />
            )}
          </div>
        ))}
      </div>

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
      <div className="space-y-2">
        <SectionTitle>Select Avatar</SectionTitle>
        <TabStyleRadio
          options={["Ectomorph", "Mesomorph", "Endomorph"]}
          value={data.bodyType}
          onChange={(bodyType) => setState("bodyType", bodyType)}
          className="text-[12px]"
        />

        {/* Avatars */}
        <div className="rounded-lg border-gray-200 p-5 border grid grid-cols-4 gap-3 min-h-[200px] justify-items-center items-baseline">
          {Array(12)
            .fill(null)
            .map((_, index) => (
              <Image
                src={`/images/persons/person-${(index % 5) + 1}.svg`}
                alt="avatar"
                width={100}
                height={100}
                className="w-auto max-h-[80px] h-auto cursor-pointer"
              />
            ))}
        </div>
      </div>
      <hr className="border-gray-200" />
      <Button onClick={() => console.log(data)}>Add Person</Button>
    </div>
  );
};

export default AddPerson;

const TabStyleRadio = ({
  options,
  value,
  onChange,
  padding = "p-1",
  className = "",
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  padding?: string;
  className?: string;
}) => {
  return (
    <div
      className={`flex items-center gap-2 bg-background rounded-xl p-1 ${className}`}
    >
      {options.map((o, index) => (
        <span
          key={index}
          onClick={() => onChange(o)}
          className={`${padding} rounded-xl cursor-pointer w-1/2 text-center ${
            value === o && "bg-white"
          }`}
        >
          {o}
        </span>
      ))}
    </div>
  );
};
