import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const AUTHAPI = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
