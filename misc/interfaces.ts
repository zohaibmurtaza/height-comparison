import { Gender, ItemType } from "./enums";

export interface Avatar {
  id: string;
  name: string;
  unit: "cm" | "ft";
  avatar: string;
  color: string;
  height: number;
  type: ItemType;
  gender?: Gender;
}

export interface ObjectData {
  id: number;
  image: string;
  name: string;
  height: number;
  adjust_position: number;
  datetime: string;
}

export interface Character {
  id: string;
  name: string;
  gender: string;
  height: string;
  category: string;
  subcat1: string;
  subcat2: string | null;
  extras: string;
}

export interface Celebrity {
  id: number;
  title: {
    rendered: string;
  };
  meta: {
    height: string;
    gender: string;
    image?: string;
  };
}
