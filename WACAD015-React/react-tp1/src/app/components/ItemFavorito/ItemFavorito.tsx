import { produtoFavorito } from "../../types/favorito";
import React from "react";

interface ItensFavoritoProps {
  itemFavorito: produtoFavorito;
  removerItemDosFavoritos: (id: string) => void;
}

const itemFavorito = ({
  itemFavorito,
  removerItemDosFavoritos,
}: ItensFavoritoProps) => {
  return (
    <tr key={itemFavorito.id}>
      <td>{itemFavorito.nome}</td>
      <td>R$ {Number(itemFavorito.preco).toFixed(2)}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            removerItemDosFavoritos(itemFavorito.id);
          }}
        >
          Remover
        </button>
      </td>
    </tr>
  );
};

export default itemFavorito;
