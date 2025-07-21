import React from "react";
import ItemFavorito from "../ItemFavorito/ItemFavorito";
import { Produto } from "../../types/produto";

interface ListagemFavoritosProps {
  itensFavoritos: Produto[];
  refetchFavoritos: () => void;
}

const ListagemFavoritos = ({
  itensFavoritos,
  refetchFavoritos,
}: ListagemFavoritosProps) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-4 fw-light">Produtos favoritados</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Produto</th>
              <th className="text-center">Valor</th>
              <th className="text-end">Opções</th>
            </tr>
          </thead>
          <tbody>
            {itensFavoritos.map((item) => (
              <ItemFavorito
                key={item.id}
                itemFavorito={item}
                refetchFavoritos={refetchFavoritos}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListagemFavoritos;
