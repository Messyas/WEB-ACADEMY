import axios from "axios";

export const produtosApi = axios.create({
  baseURL: "https://ranekapi.origamid.dev/json/api",
});

export const apiFavoritos = axios.create({
  baseURL: "https://favoritos-json-server-main-zeta.vercel.app/",
});

export const apiDetalhes = axios.create({
  baseURL: "https://ranekapi.origamid.dev/json/api"
});
