"use client";
import Input from "@/components/ui/Input";
import { useGlobals } from "@/contexts/GlobalContext";
import useData from "@/hooks/useData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { v4 } from "uuid";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import { ObjectData } from "@/misc/interfaces";

const AddObjects = () => {
  const [name, setName] = useState("");
  const { addAvatar } = useGlobals();
  const [allObjects, setAllObjects] = useState<ObjectData[]>([]);
  const [page, setPage] = useState(1);
  const [objectsData, loading, error] = useData<{
    results: ObjectData[];
    previous: string | null;
    next: string | null;
  }>({
    url: "https://api.heightcomparison.com/custom-objects/",
    method: "GET",
    params: { search: name, page },
  });

  useEffect(() => {
    setAllObjects([]);
  }, [name]);

  const objects = objectsData?.results || [];

  useEffect(() => {
    setAllObjects([...allObjects, ...objects]);
  }, [objectsData]);

  return (
    <div className="w-full h-full space-y-2.5">
      <SectionTitle className="text-lg font-semibold">
        Add an object
      </SectionTitle>
      <Input
        name="name"
        placeholder="Name"
        value={name}
        type="search"
        onChange={(value) => setName(value)}
      />

      {!error ? (
        <>
          <div className="rounded-lg border-gray-200 p-5 border grid grid-cols-3 gap-3 min-h-[200px] justify-items-center items-baseline overflow-y-auto max-h-[300px] relative">
            {loading && (
              <div className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center bg-white/75">
                <ImSpinner2 className="animate-spin" size={50} />
              </div>
            )}
            {allObjects.map((obj, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-full relative [&:hover>h3]:opacity-100 transition-opacity duration-300 flex justify-center items-center cursor-pointer"
                  onClick={() =>
                    addAvatar({
                      avatar: obj.image,
                      name: obj.name,
                      height: obj.height,
                      color: "#000",
                      unit: "cm",
                      id: v4(),
                      type: "object",
                    })
                  }
                >
                  <h3 className="absolute left-0 top-0 w-full h-full text-center bg-primary/80 flex items-center justify-center text-[9px] font-semibold opacity-0 rounded-md transition-opacity duration-300">
                    {obj.name}
                  </h3>
                  <Image
                    key={index}
                    src={obj.image}
                    alt="avatar"
                    width={100}
                    height={100}
                    className={`w-auto max-h-[80px] h-[100px] cursor-pointer py-2 px-3 rounded-md object-contain object-center border border-gray-100`}
                  />
                </div>
              );
            })}
          </div>
          {objectsData?.next && (
            <Button onClick={() => setPage(page + 1)}>Load MORE</Button>
          )}
        </>
      ) : (
        <h1 className="text-red-400 bg-red-100 border border-red-200 rounded-lg">
          {error?.toString()}
        </h1>
      )}
    </div>
  );
};

export default AddObjects;
