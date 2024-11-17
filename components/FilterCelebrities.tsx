import React, { useEffect, useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import TabStyleRadio from "./ui/TabStyleRadio";
import useData from "@/hooks/useData";
import Select from "react-select";
import { useGlobals } from "@/contexts/GlobalContext";
import { v4 } from "uuid";
import { Character } from "@/misc/interfaces";
import { colors } from "@/misc/data";
import Message from "./ui/Message";

const FilterCelebrities = () => {
  const { addAvatar, avatars } = useGlobals();
  const [category, setCategory] = useState("");
  const [subcat1, setSubcat1] = useState<string | null>(null);
  const [subcat2, setSubcat2] = useState<string | null>(null);
  const [randomColor, setRandomColor] = useState(0);
  const [subcategories, loading, error] = useData<{
    results: { subcat1: string }[];
  }>({
    url: "/subcat1/",
    method: "GET",
    params: { category },
  });

  const [subcagtegories2, loading2, error2] = useData<{
    results: { subcat2: string }[];
  }>({
    url: "/subcat2/",
    method: "GET",
    params: { category, subcat1 },
  });

  const [characters, loading3, error3] = useData<{
    results: Character[];
  }>({
    url: "/character/search",
    method: "GET",
    params: { subcat2 },
  });

  useEffect(() => {
    setRandomColor(Math.floor(Math.random() * colors.length));
  }, [avatars]);

  return (
    <div className="space-y-4">
      <SectionTitle>Select Category</SectionTitle>
      <TabStyleRadio
        options={["Celebrity", "Fictional"]}
        value={category}
        onChange={(category) => {
          setSubcat1(null);
          setSubcat2(null);
          setCategory(category);
        }}
      />

      {/* Subcategories */}
      {category &&
        (error ? (
          <Message variant="error">
            Error fetching subcategories: {error}
          </Message>
        ) : (
          <div>
            <SectionTitle className="capitalize">{category}</SectionTitle>
            <Select
              options={subcategories?.results.map((subcat) => ({
                label: subcat.subcat1,
                value: subcat.subcat1,
              }))}
              isSearchable={false}
              classNames={{
                control: () =>
                  "!rounded-lg p-1 border-primary hover:!border-primary focus:!border-primary !outline-none",
                singleValue: () => "capitalize",
                option: () => "capitalize",
              }}
              isLoading={loading}
              placeholder="Select Subcategory"
              value={{ label: subcat1, value: subcat1 }}
              onChange={(selectedOption) => {
                setSubcat1(selectedOption?.value || "");
                setSubcat2("");
              }}
            />
          </div>
        ))}

      {/* Subcategories 2 */}
      {subcat1 &&
        (error2 ? (
          <Message variant="error">
            Error fetching subcategories: {error2}
          </Message>
        ) : (
          <div>
            <SectionTitle className="capitalize">{subcat1}</SectionTitle>
            <Select
              options={subcagtegories2?.results.map((subcat) => ({
                label: subcat.subcat2,
                value: subcat.subcat2,
              }))}
              isSearchable={false}
              classNames={{
                control: () =>
                  "!rounded-lg p-1 border-primary hover:!border-primary focus:!border-primary !outline-none",
                singleValue: () => "capitalize",
                option: () => "capitalize",
              }}
              isLoading={loading2}
              placeholder="Select Subcategory"
              value={{ label: subcat2, value: subcat2 }}
              onChange={(selectedOption) => {
                setSubcat2(selectedOption?.value || "");
              }}
            />
          </div>
        ))}

      {/* Name */}
      {subcat2 &&
        (error3 ? (
          <Message variant="error">Error fetching characters: {error3}</Message>
        ) : (
          <div>
            <SectionTitle>Name</SectionTitle>
            <Select
              options={characters?.results.map((character) => ({
                label: character.name,
                value: character.name,
                data: character,
              }))}
              isSearchable={false}
              classNames={{
                control: () =>
                  "!rounded-lg p-1 border-primary hover:!border-primary focus:!border-primary !outline-none",
                singleValue: () => "capitalize",
                option: () => "capitalize",
              }}
              isLoading={loading3}
              placeholder="Select Subcategory"
              onChange={(character) =>
                character &&
                addAvatar({
                  id: v4(),
                  name: character.data.name,
                  unit: "cm",
                  avatar:
                    character.data.gender === "m"
                      ? "/images/persons/person-1.svg"
                      : "/images/persons/person-4.svg",
                  color: colors[randomColor],
                  height: parseFloat(character.data.height),
                  type: "person",
                })
              }
            />
          </div>
        ))}
    </div>
  );
};

export default FilterCelebrities;
