import React from "react";
import ItemFavorito from "../ItemFavorito/ItemFavorito";
import { Produto } from "../../types/produto";

interface IListagemFavoritosProps {
  itensFavoritos: Produto[];
  refetchFavoritos: () => void;
}

const ListagemFavoritos = ({
  itensFavoritos,
  refetchFavoritos,
}: IListagemFavoritosProps) => {
  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">Produtos favoritados</h5>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor</th>
                <th>Opções</th>
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
    </div>
  );
};

export default ListagemFavoritos;
