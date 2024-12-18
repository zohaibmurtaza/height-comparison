import React, { useMemo, useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import useData from "@/hooks/useData";
import Select from "react-select";
import { useGlobals } from "@/contexts/GlobalContext";
import { v4 } from "uuid";
import { colors, fetchImageById } from "@/misc/data";
import Message from "./ui/Message";
import { ItemType } from "@/misc/enums";
import { API_ENDPOINTS } from "@/misc/apiEndpoints";
import { Celebrity } from "@/misc/interfaces";
import { getAnonymouseAvatar } from "@/utils/getAnonymouseAvatar";
import TabStyleRadio from "./ui/TabStyleRadio";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface CelebrityCategory {
  id: number;
  slug: string;
  name: string;
}

interface CelebrityOption {
  label: string;
  value: number;
}

const FilterCelebrities = () => {
  const { addAvatar, avatarCounts } = useGlobals();
  const [category, setCategory] = useState<CelebrityOption | null>(null);
  const [subcat, setSubcat] = useState<CelebrityOption | null>(null);
  const [subcat2, setSubcat2] = useState<CelebrityOption | null>(null);
  const [topCategories, topCategoriesLoading, topCategoriesError] = useData<
    CelebrityCategory[]
  >({
    url: API_ENDPOINTS.celebrities.categories(0),
    method: "GET",
  });

  const [subcategories, subcategoriesLoading, subcategoriesError] = useData<
    CelebrityCategory[]
  >({
    url: API_ENDPOINTS.celebrities.categories(category?.value || 0),
    method: "GET",
  });

  const [subcagtegories2, loading2, error2] = useData<CelebrityCategory[]>({
    url: API_ENDPOINTS.celebrities.categories(subcat?.value || 0),
    method: "GET",
  });

  const parentId =
    category?.label === "Celebrities" ? subcat?.value : subcat2?.value;

  const [characters, loading3, error3] = useData<Celebrity[]>({
    url: API_ENDPOINTS.celebrities.all(parentId || 0),
    method: "GET",
  });

  const classes = useMemo(() => {
    return {
      control: () =>
        "!rounded-lg p-1 border-primary hover:!border-primary focus:!border-primary !outline-none",
      singleValue: () => "capitalize",
      option: () => "capitalize",
    };
  }, []);

  const isUnderSubcat2 = category?.label === "Celebrities" && subcat2;

  return (
    <div className="space-y-4">
      <SectionTitle className="text-lg font-semibold">
        Filter by Category
      </SectionTitle>

      {/* Top Categories */}
      {topCategoriesError ? (
        <Message variant="error">
          Error fetching top categories: {topCategoriesError}
        </Message>
      ) : (
        <div>
          <SectionTitle className="capitalize">Select Category</SectionTitle>
          {topCategoriesLoading ? (
            <Skeleton className="mt-3 min-h-[40px]" borderRadius={10} />
          ) : (
            <TabStyleRadio
              className="mt-3 min-h-[40px]"
              options={topCategories?.map((cat) => cat.name) || []}
              value={category?.label}
              onChange={(value) => {
                setCategory(() => {
                  const selectedCategory =
                    topCategories?.find((cat) => cat.name === value) || null;
                  return {
                    label: selectedCategory?.name || "Celebrities",
                    value: selectedCategory?.id || 0,
                  };
                });
                setSubcat(null);
                setSubcat2(null);
              }}
            />
          )}
        </div>
      )}

      {/* Subcategories */}
      {category &&
        (subcategoriesError ? (
          <Message variant="error">
            Error fetching subcategories: {subcategoriesError}
          </Message>
        ) : (
          <div>
            <SectionTitle className="capitalize">{category.label}</SectionTitle>
            <Select
              options={(subcategories || [])?.map((subcat) => ({
                label: subcat.name,
                value: subcat.id,
              }))}
              isSearchable={false}
              classNames={classes}
              isLoading={subcategoriesLoading}
              placeholder="Select Subcategory"
              value={subcat}
              onChange={(selectedOption) => {
                setSubcat(selectedOption || null);
                setSubcat2(null);
              }}
            />
          </div>
        ))}

      {/* Subcategories 2 */}
      {category?.label === "Fictional" &&
        subcat &&
        (error2 ? (
          <Message variant="error">
            Error fetching subcategories: {error2}
          </Message>
        ) : (
          <div>
            <SectionTitle className="capitalize">{subcat.label}</SectionTitle>
            <Select
              options={subcagtegories2?.map((subcat) => ({
                label: subcat.name,
                value: subcat.id,
              }))}
              isSearchable={false}
              classNames={classes}
              isLoading={loading2}
              placeholder="Select Subcategory"
              value={subcat2}
              onChange={(selectedOption) => {
                setSubcat2(selectedOption || null);
              }}
            />
          </div>
        ))}

      {/* Name */}
      {(isUnderSubcat2 || subcat) &&
        (error3 ? (
          <Message variant="error">Error fetching characters: {error3}</Message>
        ) : (
          <div>
            <SectionTitle>Name</SectionTitle>
            <Select
              options={characters?.map((character) => ({
                label: character.title.rendered,
                value: character.id,
                data: character,
              }))}
              isSearchable={false}
              classNames={classes}
              isLoading={loading3}
              placeholder="Select Subcategory"
              onChange={(character) => {
                if (avatarCounts.object >= 10 || !character) return;
                addAvatar({
                  id: v4(),
                  name: character.data.title.rendered,
                  avatar: character.data.meta.image
                    ? fetchImageById(character.data.meta.image)
                    : getAnonymouseAvatar(
                        parseFloat(character.data.meta.height),
                        character.data.meta.gender || "male"
                      ),
                  color: character.data.meta.image
                    ? colors[Math.floor(Math.random() * colors.length)]
                    : "white",
                  height: parseFloat(character.data.meta.height),
                  type: ItemType.OBJECT,
                  weight: character.data.meta?.weight,
                });
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default FilterCelebrities;
