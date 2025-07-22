"use client";
import { useParams } from "next/navigation";
import React from "react";
import Image from "next/image";

import { useDetalhesProduto } from "@/app/hooks/useDetalhesProduto";

const Produto = () => {
  const params = useParams();

  const nomeProduto = params.produto as string;

  const { produto, isPending, isError } = useDetalhesProduto(nomeProduto);

  if (isPending) return <h5>Carregando...</h5>;

  if (isError) return <h5>Ocorreu um erro ao carregar o produto.</h5>;

  if (!produto)
    return <h5>Não há detalhes disponíveis para este produto no momento.</h5>;

  return (
    <main>
      <div className="container p-5">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>
            {produto ? (
              <>
                <h5 className="card-title mb-4 fw-bold">{produto.nome}</h5>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
                  {produto.fotos.map((foto, index) => (
                    <Image
                      key={index}
                      src={foto.src}
                      alt={foto.titulo}
                      width={300}
                      height={320}
                    />
                  ))}
                </div>

                <p className="card-text fw-medium">
                  Valor: R${Number(produto.preco).toFixed(2)}
                </p>
                <p className="card-text fw-medium">
                  Descrição: {produto.descricao}
                </p>
                <p className="card-text fw-medium">
                  Anunciado por: {produto.usuario_id}
                </p>
              </>
            ) : (
              <h5 className="card-title mb-4 fw-bold">Carregando...</h5>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Produto;
