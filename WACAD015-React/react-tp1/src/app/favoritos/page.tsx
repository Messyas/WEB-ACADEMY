// app/favoritos/page.tsx
"use client";

import React from "react";
import ListagemFavoritos from "../components/ListagemFavoritos/ListagemFavotitos";
import { useGetFavoritos, useRemoveFavorito } from "../hooks/useProdutoFavorito";
import { toast } from "react-toastify";

export default function Favoritos() {
  const { favoritos, isPending, isError, refetchFavoritos } = useGetFavoritos();

  const { removeFavorito, isPending: isRemoving } = useRemoveFavorito(() => {
    toast.success("Produto removido com sucesso");
    // Se estiver usando refetch no lugar de invalidate:
    // refetchFavoritos();
  });

  return (
    <main>
      <div className="container p-5">
        <ListagemFavoritos
          itensFavoritos={favoritos}
          onRemoverFavorito={removeFavorito} // <-- adiciona callback de remoção
        />
      </div>
    </main>
  );
}
