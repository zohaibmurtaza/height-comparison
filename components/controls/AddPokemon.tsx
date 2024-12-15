"use client";
import Input from "@/components/ui/Input";
import { useGlobals } from "@/contexts/GlobalContext";
import useData from "@/hooks/useData";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { v4 } from "uuid";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import Message from "../ui/Message";
import { useDebounce } from "@uidotdev/usehooks";
import { API_ENDPOINTS } from "@/misc/apiEndpoints";
import { ItemType } from "@/misc/enums";
import {
  FEMALE_AVATARS,
  fetchImageById,
  ITEMS_PER_PAGE,
  MALE_AVATARS,
} from "@/misc/data";
import { Celebrity } from "@/misc/interfaces";

const AddPokemon = () => {
  const [name, setName] = useState("");
  const debouncedName = useDebounce(name, 300);
  const { addAvatar, avatarCounts } = useGlobals();
  const [allObjects, setAllObjects] = useState<Celebrity[]>([]);
  const [page, setPage] = useState(1);
  const [objectsData, loading, error] = useData<Celebrity[]>({
    url: API_ENDPOINTS.celebrities.all(142),
    method: "GET",
    params: { search: debouncedName },
  });

  useEffect(() => {
    setAllObjects([]);
  }, [debouncedName]);

  useEffect(() => {
    setAllObjects((prevState) => [...prevState, ...(objectsData || [])]);
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
          <div className="rounded-lg border-gray-200 p-5 border grid grid-cols-3 sm:grid-cols-4 gap-3 min-h-[200px] justify-items-center items-baseline overflow-y-auto max-h-[300px] relative">
            {loading && (
              <div className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center bg-white/75">
                <ImSpinner2 className="animate-spin" size={50} />
              </div>
            )}
            {allObjects.map((obj, index) => {
              const avatarImage = obj.meta.image
                ? fetchImageById(obj.meta.image)
                : obj.meta.gender === "male"
                ? MALE_AVATARS
                : FEMALE_AVATARS;
              return (
                <div
                  key={index}
                  className="w-full relative [&:hover>h3]:opacity-100 transition-opacity duration-300 flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    if (avatarCounts.object >= 3) return;
                    addAvatar({
                      avatar: avatarImage,
                      name: obj.title.rendered,
                      height: parseFloat(obj.meta.height),
                      color: "#000",
                      id: v4(),
                      type: ItemType.POKEMON,
                    });
                  }}
                >
                  <h3 className="absolute left-0 top-0 w-full h-full text-center bg-primary/80 flex items-center justify-center text-[9px] font-semibold opacity-0 rounded-md transition-opacity duration-300">
                    {obj.title.rendered}
                  </h3>
                  <img
                    key={index}
                    src={avatarImage}
                    alt="avatar"
                    width={100}
                    height={100}
                    className={`w-auto max-h-[80px] h-[100px] cursor-pointer py-2 px-3 rounded-md object-contain object-center border border-gray-100`}
                  />
                </div>
              );
            })}
          </div>
          {objectsData?.length === ITEMS_PER_PAGE && (
            <Button onClick={() => setPage(page + 1)}>Load MORE</Button>
          )}
        </>
      ) : (
        <Message variant="error">{error?.toString()}</Message>
      )}
      {avatarCounts.object >= 3 && (
        <Message variant="error">
          Max 3 objects at a time. Remove one to add another.
        </Message>
      )}
    </div>
  );
};

export default AddPokemon;
