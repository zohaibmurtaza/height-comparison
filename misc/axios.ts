import axios from "axios";

export const server = axios.create({
  baseURL: "https://height.dollarbits.ca/wp-json/",
});
