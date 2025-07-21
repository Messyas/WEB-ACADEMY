// app/components/CardProduto/CardProduto.tsx
"use client";

// 1. Importe useState e useEffect
import { useState, useEffect } from "react";
import { useFavoritos } from "@/app/state/FavoritosProvider";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import Image from "next/image";

interface CardProdutoProps {
  produto: Produto;
  mostrarImagem?: boolean;
  mostrarBotao?: boolean;
}

export default function CardProduto({
  produto,
  mostrarImagem = true,
  mostrarBotao = true,
}: CardProdutoProps) {
  const { favoritos, setFavoritos } = useFavoritos();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const adicionarAosFavoritos = (produto: Produto) => {
    setFavoritos((favoritosAtuais) => [...favoritosAtuais, produto]);
  };

  const removerDosFavoritos = (id: string) => {
    setFavoritos((favoritosAtuais) =>
      favoritosAtuais.filter((p) => p.id !== id)
    );
  };

  const ehFavorito =
    isMounted && favoritos.some((item) => item.id === produto.id);

  const handleFavoritoClick = () => {
    if (ehFavorito) {
      removerDosFavoritos(produto.id);
    } else {
      adicionarAosFavoritos(produto);
    }
  };

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        {mostrarImagem && (
          <Image
            src={produto.fotos[0].src}
            className="card-img-top"
            alt={produto.fotos[0].titulo}
            width={150}
            height={180}
            style={{ objectFit: "cover" }}
          />
        )}

        <div className="card-body d-flex flex-column">
          <div className="flex-grow-1">
            <span className="badge text-bg-success text-white mb-2">
              {produto.desconto}% de desconto
            </span>
            <h5 className="card-title fw-bold">{produto.nome}</h5>
            <span className="text-secondary text-decoration-line-through">
              De R$ {produto.preco}
            </span>
            <h5 className="card-text">
              Por R${" "}
              {calculaValorComPorcentagemDeDesconto(
                Number(produto.preco),
                produto.desconto
              ).toFixed(2)}
            </h5>
          </div>
          {mostrarBotao && (
            <button
              className={
                ehFavorito
                  ? "btn btn-danger d-block w-100 mt-3"
                  : "btn btn-outline-success d-block w-100 mt-3"
              }
              type="button"
              onClick={handleFavoritoClick}
              disabled={!isMounted}
            >
              {ehFavorito ? "Remover Favorito" : "Favoritar"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
