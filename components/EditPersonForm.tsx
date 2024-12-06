import { Avatar } from "@/misc/interfaces";
import { BiTrash } from "react-icons/bi";
import { useGlobals } from "@/contexts/GlobalContext";
import Input from "@/components/ui/Input";
import SectionTitle from "./ui/SectionTitle";
import HeightInput from "./HeightInput";
import TabStyleRadio from "./ui/TabStyleRadio";
import { useState } from "react";
import Colors from "./Colors";
import AvatarSelector from "./AvatarSelector";
import { FaCaretRight } from "react-icons/fa";
import { Gender } from "@/misc/enums";

const EditPersonForm = ({ avatar }: { avatar: Avatar }) => {
  const { removeAvatar, updateAvatar, selectedAvatar, setSelectedAvatar } =
    useGlobals();
  const [unit, setUnit] = useState<"cm" | "ft">(avatar.unit);
  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-300">
      <div className="flex items-center justify-between">
        <div
          onClick={() =>
            setSelectedAvatar(avatar.id === selectedAvatar ? null : avatar.id)
          }
          className="text-lg p-1.5 flex-grow  flex items-center gap-2 text-white"
          style={{ backgroundColor: avatar.color }}
        >
          <FaCaretRight
            size={16}
            style={{
              rotate: avatar.id === selectedAvatar ? "90deg" : "0deg",
            }}
            className="mix-blend-difference text-white transition-all duration-400"
          />
          <h2 className="flex-grow mix-blend-difference text-white">
            {avatar.name}
          </h2>
        </div>
        <BiTrash
          className="px-2 cursor-pointer border-b border-gray-200"
          size={40}
          onClick={() => removeAvatar(avatar.id)}
        />
      </div>

      {/* Editin Form */}
      {selectedAvatar === avatar.id && (
        <div className="p-2 space-y-3">
          {/* Name */}
          {(avatar.type === "person" || avatar.type === "image") && (
            <div>
              <SectionTitle>Name</SectionTitle>
              <Input
                placeholder="Name"
                name="name"
                value={avatar.name}
                onChange={(name) => updateAvatar({ ...avatar, name })}
              />
            </div>
          )}

          {avatar.type === "person" && (
            <div className="space-y-1 mb-2">
              <SectionTitle>Gender</SectionTitle>
              <TabStyleRadio
                options={[Gender.MALE, Gender.FEMALE]}
                value={avatar.gender || Gender.MALE}
                onChange={(gender) =>
                  updateAvatar({ ...avatar, gender: gender as Gender })
                }
              />
            </div>
          )}

          {/* Height */}
          {(avatar.type === "person" || avatar.type === "image") && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <SectionTitle>Height</SectionTitle>
                <TabStyleRadio
                  options={["cm", "ft"]}
                  value={unit}
                  className="min-w-[100px]"
                  onChange={(unit) => {
                    setUnit(unit as "cm" | "ft");
                  }}
                />
              </div>
              <HeightInput
                height={avatar.height}
                unit={unit}
                onChange={(height) => updateAvatar({ ...avatar, height })}
              />
            </div>
          )}

          {/* Height */}
          {avatar.type === "person" && (
            <div className="space-y-1 mb-2">
              <SectionTitle>Color</SectionTitle>
              <Colors
                selectedColor={avatar.color}
                onChange={(color) => updateAvatar({ ...avatar, color })}
              />
            </div>
          )}

          {/* Avatar */}
          {avatar.type === "person" && (
            <div className="space-y-1">
              <AvatarSelector
                gender={avatar.gender || Gender.MALE}
                selectedAvatar={avatar.avatar}
                onAvatarChange={(url) =>
                  updateAvatar({ ...avatar, avatar: url })
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditPersonForm;
