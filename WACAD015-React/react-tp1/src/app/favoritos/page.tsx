"use client";

import React from "react";
import { useFavoritos } from "../hooks/useProdutoFavorito";
import ListagemFavoritos from "../components/ListagemFavoritos/ListagemFavotitos";

export default function Favoritos() {
  const { favoritos, isCarregando, isError, refetchFavoritos } = useFavoritos();

  if (isCarregando) {
    return (
      <div className="container p-5 text-center">
        <p>Carregando favoritos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container p-5 text-center">
        <p className="text-danger">Ocorreu um erro ao buscar os favoritos.</p>
      </div>
    );
  }

  return (
    <main>
      <div className="container p-5">
        {favoritos.length > 0 ? (
          <ListagemFavoritos
            itensFavoritos={favoritos}
            refetchFavoritos={refetchFavoritos}
          />
        ) : (
          <div className="text-center">
            <h5>Você ainda não tem produtos favoritados.</h5>
          </div>
        )}
      </div>
    </main>
  );
}
