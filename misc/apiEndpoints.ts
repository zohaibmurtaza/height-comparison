import { ITEMS_PER_PAGE } from "./data";
import { ItemType } from "./enums";

export const API_ENDPOINTS = {
  celebrities: {
    search: (name: string) =>
      `/wp/v2/search?search=${name}&type=post&subtype=celebrities`,
    categories: (parentId: number) =>
      `/wp/v2/celebrity-categories?parent=${parentId}`,
    all: (categoryId: number) =>
      `/wp/v2/celebrities?celebrity-categories=${categoryId}`,
  },
  items: (type: ItemType, page: number) =>
    `/jet-cct/items?type=${type}&_limit=${ITEMS_PER_PAGE}&_offset=${
      (page - 1) * ITEMS_PER_PAGE
    }`,
  share: "/jet-cct/shared",
  next: {
    generateShareUrl: "/api/generate-share-link",
  },
};
