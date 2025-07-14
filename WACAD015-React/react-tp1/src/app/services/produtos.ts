import { Produto } from "../types/produto";
import api from "./api";

export async function getListaProduto(): Promise<Produto[]> {
  return api.get("/produto").then((response) => response.data);
}

export async function getDetalhesProduto(
  nomeProduto: string
): Promise<Produto> {
  return api.get(`/produto/${nomeProduto}`).then((response) => response.data);
}
