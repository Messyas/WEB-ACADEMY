"use client";

import React, { useState } from "react";
import CartSummary from "./components/ResumoCarrinho/ResumoCarrinho";
import { Produto } from "./components/utils/ProdutoProps";
import ListagemProdutos from "./components/ListagemProdutos/ListagemProduto";

const produtosDisponiveis: Produto[] = [
  {
    id: 101,
    nome: "Notebook Gamer Avançado",
    precoUnitario: 7500,
    quantidade: 12,
    imagemUrl: "/placeholder.png",
  },
  {
    id: 102,
    nome: "Cadeira Ergonômica",
    precoUnitario: 1200,
    quantidade: 5,
    imagemUrl: "/placeholder.png",
  },
  {
    id: 103,
    nome: "Fone de Ouvido",
    precoUnitario: 350,
    quantidade: 20,
    imagemUrl: "/placeholder.png",
  },
  {
    id: 104,
    nome: "SSD NVMe 1TB",
    precoUnitario: 680,
    quantidade: 8,
    imagemUrl: "/placeholder.png",
  },
];

export default function ProdutosPage() {
  const [, setCarrinho] = useState<Produto[]>([]);

  const handleAdicionarAoCarrinho = (produtoAdicionado: Produto) => {
    setCarrinho((carrinhoAtual) => [...carrinhoAtual, produtoAdicionado]);
  };

  return (
    <main>
      <div className="container p-5">
        <CartSummary />
        <ListagemProdutos
          produtos={produtosDisponiveis}
          onAddCarrinho={handleAdicionarAoCarrinho}
        />
      </div>
    </main>
  );
}
