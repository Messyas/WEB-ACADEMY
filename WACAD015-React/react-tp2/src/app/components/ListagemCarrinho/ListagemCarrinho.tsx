import React from "react";
import ItemCarrinho from "../ItemCarrinho/ItemCarrinho";
import { produtoCarrinho } from "../../types/carrinho";

interface ListagemCarrinhoProps {
  itensCarrinho: produtoCarrinho[];
  removerItemDoCarrinho: (id: string) => void;
}

const ListagemCarrinho = ({
  itensCarrinho,
  removerItemDoCarrinho,
}: ListagemCarrinhoProps) => {
  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">Produtos selecionados</h5>
        <div className="table-responsive">
          <table className="table ">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor Unitário</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {itensCarrinho.map((itemCarrinho) => (
                <ItemCarrinho
                  key={itemCarrinho.id}
                  itemCarrinho={itemCarrinho}
                  removerItemDoCarrinho={removerItemDoCarrinho}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListagemCarrinho;
