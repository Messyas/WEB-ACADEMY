"use client";

import Image from "next/image";
import React from "react";
import ListagemProdutoProps from "./ListagemProdutoProps";

export default function CardProduto({ produto, onAdd }: ListagemProdutoProps) {
  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Image
          src={produto.imagemUrl}
          className="card-img-top"
          alt={`Imagem do ${produto.nome}`}
          width={300}
          height={320}
          style={{ objectFit: 'cover' }} 
        />
        <div className="card-body bg-light">
          <h5 className="card-title">{produto.nome}</h5>
          <p className="card-text text-secondary">
            R$ {produto.precoUnitario.toFixed(2)}
          </p>
          <button
            className="btn btn-dark d-block w-100"
            type="button"
            onClick={() => onAdd(produto)}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}