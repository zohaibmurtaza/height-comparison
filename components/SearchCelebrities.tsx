"use client";
import { useGlobals } from "@/contexts/GlobalContext";
import useData from "@/hooks/useData";
import { Character } from "@/misc/interfaces";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import Message from "./ui/Message";
import { colors } from "@/misc/data";
import { useDebounce } from "@uidotdev/usehooks";
import SectionTitle from "./ui/SectionTitle";

const SearchCelebrities = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [randomColor, setRandomColor] = useState(0);
  const { addAvatar, avatars } = useGlobals();

  const [celebrities, loading, error] = useData<{
    results: Character[];
    previous: string | null;
    next: string | null;
  }>({
    url: `/character/search`,
    method: "GET",
    params: {
      name: debouncedSearch,
    },
  });

  useEffect(() => {
    setRandomColor(Math.floor(Math.random() * colors.length));
  }, [avatars]);

  return (
    <div>
      <SectionTitle>Search Celebrities</SectionTitle>
      {error && (
        <Message variant="error">Error fetching celebrities: {error}</Message>
      )}
      <Select
        options={
          celebrities?.results.map((c) => ({
            label: c.name,
            value: c.id,
            data: c,
          })) || []
        }
        classNames={{
          control: () =>
            "!rounded-lg p-1 border-primary hover:!border-primary focus:!border-primary !outline-none",
        }}
        onMenuOpen={() => setSearch("")}
        onMenuClose={() => setSearch("")}
        isLoading={loading}
        placeholder="Search for a celebrity"
        onInputChange={(value: string) => setSearch(value)}
        onChange={(selectedOption) => {
          const selectedData = selectedOption?.data as Character | undefined;
          if (selectedData) {
            if (avatars.length >= 10) return;
            addAvatar({
              id: uuidv4(),
              name: selectedData.name,
              unit: "cm",
              avatar:
                selectedData.gender === "m"
                  ? "/images/persons/person-1.svg"
                  : "/images/persons/person-4.svg",
              color: colors[randomColor],
              height: parseFloat(selectedData.height),
              type: "person",
            });
          }
        }}
      />
    </div>
  );
};

export default SearchCelebrities;
