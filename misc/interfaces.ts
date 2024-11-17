export interface Avatar {
  id: string;
  name: string;
  unit: "cm" | "ft";
  avatar: string;
  color: string;
  height: number;
  type: "person" | "object" | "image";
}

export interface ObjectData {
  id: number;
  image: string;
  name: string;
  height: number;
  adjust_position: number;
  datetime: string;
}
