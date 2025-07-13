"use client";

import React, { useState } from "react";
import CartSummary from "../components/ResumoCarrinho/ResumoCarrinho";
import ListagemCarrinho from "../components/ListagemCarrinho/ListagemCarrinho";
import { Produto } from "../components/utils/ProdutoProps";

const produtosIniciais: Produto[] = [
  { id: 1, nome: "Notebook Dell XPS", precoUnitario: 9500, quantidade: 1 },
  {
    id: 2,
    nome: "Teclado Mecânico Keychron",
    precoUnitario: 850,
    quantidade: 1,
  },
  {
    id: 3,
    nome: "Mouse Logitech MX Master 3",
    precoUnitario: 550,
    quantidade: 2,
  },
];

export default function Carrinho() {
  const [produtos, setProdutos] = useState<Produto[]>(produtosIniciais);

  // Lógica para remover um produto do estado
  const handleRemoverProduto = (produtoId: number) => {
    setProdutos((produtosAtuais) =>
      produtosAtuais.filter((p) => p.id !== produtoId)
    );
  };
  // depois add Lógica para calcular o total do carrinho

  return (
    <main>
      <div className="container p-5">
        <ListagemCarrinho
          produtos={produtos}
          onRemoveProduto={handleRemoverProduto}
        />
        <CartSummary /> {/* O CartSummary receberia o total calculado */}
      </div>
    </main>
  );
}
