import React from "react";
import { useRemoveFavorito } from "../../hooks/useProdutoFavorito";
import { Produto } from "../../types/produto";

interface ItensFavoritoProps {
  itemFavorito: Produto;
  refetchFavoritos: () => void;
}

const ItemFavorito = ({
  itemFavorito,
  refetchFavoritos,
}: ItensFavoritoProps) => {
  const { remover, isRemovendo } = useRemoveFavorito(refetchFavoritos);

  return (
    <tr>
      <td>{itemFavorito.nome}</td>
      <td>R$ {Number(itemFavorito.preco).toFixed(2)}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            remover(itemFavorito.id);
          }}
          disabled={isRemovendo}
        >
          {isRemovendo ? "Removendo..." : "Remover"}
        </button>
      </td>
    </tr>
  );
};

export default ItemFavorito;
