import axios from "axios";
import { SERVER_BASE_URL } from "./data";
import { headers } from "next/headers";

export const server = axios.create({
  baseURL: SERVER_BASE_URL,
});
