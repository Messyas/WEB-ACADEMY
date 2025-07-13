"use client";

import React from "react";
import ListagemCarrinhoProps from "./ListagemCarrinhoProps";

export default function ListagemCarrinho({
  produtos,
  onRemoveProduto,
}: ListagemCarrinhoProps) {
  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-light">Produtos selecionados</h5>
        <div className="table-responsive">
          <table className="table">
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
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.nome}</td>
                  <td>R$ {produto.precoUnitario.toFixed(2)}</td>
                  <td>{produto.quantidade}</td>
                  <td>R$ {(produto.precoUnitario * produto.quantidade).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => onRemoveProduto(produto.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}