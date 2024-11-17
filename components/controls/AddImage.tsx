"use client";

import { BiUpload } from "react-icons/bi";
import SectionTitle from "../ui/SectionTitle";
import { useEffect, useState } from "react";
import { getBase64FromFile } from "@/utils/ReadFileFromStorage";
import ImageCropper from "../ImageCropper";
import Input from "../ui/Input";
import HeightInput from "../HeightInput";
import TabStyleRadio from "../ui/TabStyleRadio";
import Button from "../ui/Button";
import { useGlobals } from "@/contexts/GlobalContext";
import toast from "react-hot-toast";
import { v4 } from "uuid";
import { Avatar } from "@/misc/interfaces";

const AddImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    if (image) {
      getBase64FromFile(image)
        .then((data) => {
          console.log("Image base64", data);
          setImageUrl(data as string);
          setModalOpen(true);
        })
        .catch(() => setImageUrl(null));
    }
  }, [image]);
  return (
    <div className="w-full h-full space-y-2.5">
      <SectionTitle>Add your own image</SectionTitle>
      <label className="border border-primary border-dashed  rounded-xl p-5 bg-primary/5 flex flex-col justify-center items-center gap-2.5 cursor-pointer min-h-[250px]">
        <input
          type="file"
          className="hidden"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <BiUpload
          size={50}
          className="bg-primary p-3 rounded-lg"
          color="white"
        />
        <p className="text-sm text-gray-500 text-center">
          Drag and drop your image here or click to select a file
        </p>
      </label>
      {imageUrl && modalOpen && (
        <AddImageModel
          imageUrl={imageUrl}
          onAdded={() => {
            setImage(null);
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default AddImage;

const AddImageModel = ({
  imageUrl,
  onAdded,
}: {
  imageUrl: string;
  onAdded: () => void;
}) => {
  const { addAvatar } = useGlobals();
  const [data, setData] = useState<Avatar>({
    avatar: "",
    name: "",
    unit: "ft",
    color: "#eeeeee",
    height: 0,
    id: v4(),
    type: "image",
  });

  const setImageData = (key: keyof Avatar, value: string | number) => {
    setData({ ...data, [key]: value });
  };

  const handleAddImage = async () => {
    if (!data.avatar || data.height === 0 || !data.name) {
      toast.error("Please fill all the fields");
      return;
    }
    addAvatar(data);
    onAdded();
  };

  return (
    <dialog
      open
      className="fixed z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex min-w-[700px] h-[500px] border-none rounded-xl shadow-xl bg-white overflow-hidden"
    >
      <div className="w-1/2 h-full p-5 space-y-2.5">
        <Input
          name="name"
          value={data.name}
          onChange={(name) => setImageData("name", name)}
          placeholder="Name"
        />
        <SectionTitle>Height</SectionTitle>
        <TabStyleRadio
          options={["cm", "ft"]}
          value={data.unit}
          onChange={(unit) => setImageData("unit", unit)}
        />
        <HeightInput
          height={data.height}
          unit={data.unit}
          onChange={(height) => setImageData("height", height)}
        />
        <Button onClick={handleAddImage} className="">
          Add Image
        </Button>
        <Button
          className="bg-white !text-gray-500 border !border-gray-200"
          onClick={onAdded}
        >
          Cancel
        </Button>
      </div>
      <div className="w-1/2 h-full relative">
        <ImageCropper
          imageUrl={imageUrl}
          setCroppedImage={(image) => setImageData("avatar", image || "")}
        />
      </div>
    </dialog>
  );
};
