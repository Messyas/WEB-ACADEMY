import React from "react";
import { Produto } from "../../types/produto";
import { toast } from "react-toastify";
import { useRemoveFavorito } from "@/app/hooks/useProdutoFavorito";
import { useQueryClient } from "@tanstack/react-query";

interface IItemFavoritoProps {
  itemFavorito: Produto;
  refetchFavoritos: () => void;
}

export default function ItemFavorito({ itemFavorito }: IItemFavoritoProps) {
  const queryClient = useQueryClient();

  const { isPending, removeFavorito } = useRemoveFavorito(
    () => {
      toast.success("Produto removido com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["listaFavoritos"] });
    },
    () => toast.error("Algo deu errado ao remover o favorito")
  );

  return (
    <tr>
      <td>{itemFavorito.nome}</td>
      <td>R$ {Number(itemFavorito.preco).toFixed(2)}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => removeFavorito(itemFavorito.id)}
          style={{ minWidth: 120 }}
        >
          {isPending ? "Removendo..." : "Remover"}
        </button>
      </td>
    </tr>
  );
}
