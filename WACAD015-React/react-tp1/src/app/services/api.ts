import axios from "axios";

export const api = axios.create({
  baseURL: "https://ranekapi.origamid.dev/json/api",
});

export const apiFavoritos = axios.create({
  baseURL: "",
});
