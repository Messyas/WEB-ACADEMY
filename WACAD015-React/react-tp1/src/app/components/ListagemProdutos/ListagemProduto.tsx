"use client";

import React from "react";
import CardProduto from "./CardProduto";
import { Produto } from "../utils/ProdutoProps";

interface ListagemProdutosProps {
  produtos: Produto[];
  onAddCarrinho: (produto: Produto) => void;
}

export default function ListagemProdutos({
  produtos,
  onAddCarrinho,
}: ListagemProdutosProps) {
  return (
    <>
      <h5 className="mb-3">Produtos disponíveis:</h5>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {produtos.map((produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
            onAdd={onAddCarrinho}
          />
        ))}
      </div>
    </>
  );
}
