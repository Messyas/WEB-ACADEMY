"use client";

import React from "react";
import { useFavoritos } from "../hooks/useProdutoFavorito";
import ListagemFavoritos from "../components/ListagemFavoritos/ListagemFavotitos";

export default function Favoritos() {
  const { favoritos, isPending, isError, refetchFavoritos } = useFavoritos();

  if (isPending) {
    return (
      <div className="container p-5 text-center">Carregando favoritos...</div>
    );
  }

  if (isError) {
    return (
      <div className="container p-5 text-center text-danger">
        Erro ao buscar favoritos.
      </div>
    );
  }

  return (
    <main className="container p-5">
      <ListagemFavoritos
        itensFavoritos={favoritos ?? []}
        refetchFavoritos={refetchFavoritos}
      />
    </main>
  );
}
