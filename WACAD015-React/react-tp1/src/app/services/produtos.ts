import { Produto } from "../types/produto";
import { apiDetalhes, apiFavoritos, produtosApi } from "./api";

export async function getListaProduto(): Promise<Produto[]> {
  return produtosApi.get("/produto").then((response) => response.data);
}

export async function getDetalhesProduto(
  nomeProduto: string
): Promise<Produto> {
  return produtosApi
    .get(`/produto/${nomeProduto}`)
    .then((response) => response.data);
}

//usa a api dos slides
export async function pegarDetalhesProduto(
  nomeProduto: string
): Promise<Produto> {
  return apiDetalhes
    .get(`/produto/${nomeProduto}`)
    .then((response) => response.data);
}

export async function addFavorito(produto: Produto) {
  await new Promise((resolve) => setTimeout(resolve, 1000)); //simula delay de chamada real

  return apiFavoritos
    .post<Produto>("/favoritos", produto)
    .then((response) => response.data);
}

export async function getFavoritos(): Promise<Produto[]> {
  return apiFavoritos.get("/favoritos").then((response) => response.data);
}

export async function removeFavorito(produtoId: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500)); // simula delay
  await apiFavoritos.delete(`/favoritos/${produtoId}`);
}
