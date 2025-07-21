"use client";

import React from "react";
import {
  useGetFavoritos,
  useRemoveFavorito,
} from "../hooks/useProdutoFavorito";
import { toast } from "react-toastify";
import ListagemFavoritos from "../components/ListagemFavoritos/ListagemFavotitos";

export default function Favoritos() {
  const { favoritos, isPending, isError } = useGetFavoritos();

  const { removeFavorito } = useRemoveFavorito(() => {
    toast.success("Produto removido com sucesso!");
  });

  if (isPending) {
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
        {favoritos && favoritos.length > 0 ? (
          <ListagemFavoritos
            itensFavoritos={favoritos}
            onRemoverFavorito={removeFavorito}
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
