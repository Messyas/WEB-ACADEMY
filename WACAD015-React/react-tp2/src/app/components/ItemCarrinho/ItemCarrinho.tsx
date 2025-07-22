import { produtoCarrinho } from "../../types/carrinho";
import React from "react";

interface ItensCarrinhoProps {
  itemCarrinho: produtoCarrinho;
  removerItemDoCarrinho: (id: string) => void;
}

const ItemCarrinho = ({
  itemCarrinho,
  removerItemDoCarrinho,
}: ItensCarrinhoProps) => {
  const valorTotalProduto = (
    precoUnitario: number,
    quantidade: number
  ): number => precoUnitario * quantidade;

  return (
    <tr key={itemCarrinho.id}>
      <td>{itemCarrinho.nome}</td>
      <td>R$ {itemCarrinho.preco.toFixed(2)}</td>
      <td>{itemCarrinho.quantidade}</td>

      <td>
        R${" "}
        {valorTotalProduto(itemCarrinho.preco, itemCarrinho.quantidade).toFixed(
          2
        )}
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            removerItemDoCarrinho(itemCarrinho.id);
          }}
        >
          Remover
        </button>
      </td>
    </tr>
  );
};

export default ItemCarrinho;
