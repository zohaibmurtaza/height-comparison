"use client";

import { useState } from "react";
import Switch from "../ui/Switch";
import Button from "../ui/Button";

interface AddPersonData {
  gender: "Male" | "Female";
  unit: "cm" | "ft";
  displayAvatar: boolean;
  bodyType: "Ectomorph" | "Mesomorph" | "Endomorph";
  selectedAvatar: string | null;
}

const AddPerson = () => {
  const [data, setData] = useState<AddPersonData>({
    gender: "Male",
    unit: "cm",
    displayAvatar: true,
    bodyType: "Ectomorph",
    selectedAvatar: null,
  });

  const setState = (key: keyof AddPersonData, value: any) => {
    setData({ ...data, [key]: value });
  };

  return (
    <div className="w-full space-y-6">
      <Toggle
        options={["Male", "Female"]}
        value={data.gender}
        onChange={(gender) => setState("gender", gender)}
      />

      {/* Type */}
      <div className="flex items-center justify-between gap-2 w-full">
        <span className="text-base">Type</span>
        <Toggle
          options={["cm", "ft"]}
          value={data.unit}
          onChange={(unit) => setState("unit", unit)}
          className="w-[100px]"
        />
      </div>

      {/* Height */}
      <input
        type="number"
        className="w-full rounded-lg p-2 py-3 shadow-md border border-gray-50"
        placeholder="Person Height"
      />

      {/* Display Avatar */}
      <div className="w-full rounded-xl border flex items-center justify-between gap-2 p-3 py-4 border-gray-200">
        <div>
          <h1 className="text-base font-medium leading-none">Display Avatar</h1>
          <span className="text-xs font-light">
            Lorem Ipsum is simply dummy text.
          </span>
        </div>
        <Switch
          value={data.displayAvatar}
          onChange={() => setState("displayAvatar", !data.displayAvatar)}
        />
      </div>

      {/* Select Avatar */}
      <span className="text-base">Type</span>
      <Toggle
        options={["Ectomorph", "Mesomorph", "Endomorph"]}
        value={data.bodyType}
        onChange={(bodyType) => setState("bodyType", bodyType)}
        className="text-[12px]"
      />

      {/* Avatars */}
      <div className="rounded-lg border-gray-200 p-3 border grid grid-cols-4 gap-2 min-h-[200px]">
        {Array(12)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="w-full aspect-square rounded-full bg-gray-600"
            ></div>
          ))}
      </div>

      <Button onClick={() => console.log(data)}>Add Person</Button>
    </div>
  );
};

export default AddPerson;

const Toggle = ({
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
