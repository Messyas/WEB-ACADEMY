import React, { useEffect } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockProdutos } from "@/app/mocks/produtos";

import ListagemFavoritos from "../ListagemFavoritos";
import {
  FavoritosProvider,
  useFavoritosContext,
} from "@/app/State/FavoritosProvider";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: any) => <img alt="" {...props} />,
}));

jest.mock("@/app/helpers", () => ({
  calculaValorComPorcentagemDeDesconto: jest.fn(
    (preco, desconto) => preco * (1 - desconto / 100)
  ),
}));

const renderizarListagem = (favoritosIniciais: Produto[]) => {
  const WrapperComEstado = ({ children }: { children: React.ReactNode }) => {
    const { setFavoritos } = useFavoritosContext();
    useEffect(() => {
      setFavoritos(favoritosIniciais);
    }, [setFavoritos]);
    return <>{children}</>;
  };

  return render(
    <FavoritosProvider>
      <WrapperComEstado>
        <ListagemFavoritos />
      </WrapperComEstado>
    </FavoritosProvider>
  );
};

describe("Componente: ListagemFavoritos", () => {
  beforeEach(() => {
    (calculaValorComPorcentagemDeDesconto as jest.Mock).mockClear();
  });

  it("deve renderizar a mensagem de estado vazio quando não há favoritos", () => {
    renderizarListagem([]);

    expect(
      screen.getByText("Sua lista de favoritos está vazia.")
    ).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByText("Quantidade de produtos: 0")).toBeInTheDocument();
    expect(screen.getByText("Valor total: R$ 0.00")).toBeInTheDocument();
  });

  it("deve renderizar a lista de favoritos e os totais corretamente", () => {
    const favoritos = [mockProdutos[0], mockProdutos[1]];
    renderizarListagem(favoritos);

    expect(screen.getByText(mockProdutos[0].nome)).toBeInTheDocument();
    expect(screen.getByText(mockProdutos[1].nome)).toBeInTheDocument();
    expect(
      screen.queryByText("Sua lista de favoritos esta vazia.")
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(`Quantidade de produtos: ${favoritos.length}`)
    ).toBeInTheDocument();

    const valorTotal = favoritos.reduce(
      (acc, item) =>
        acc +
        calculaValorComPorcentagemDeDesconto(Number(item.preco), item.desconto),
      0
    );
    expect(
      screen.getByText(`Valor total: R$ ${valorTotal.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("deve permitir remover um item e atualizar a lista e os totais", async () => {
    const user = userEvent.setup();
    const favoritos = [mockProdutos[0], mockProdutos[1]];
    renderizarListagem(favoritos);

    const linhaProduto = screen.getByText(mockProdutos[0].nome).closest("tr")!;
    const botaoRemover = within(linhaProduto).getByRole("button", {
      name: /Remover/i,
    });
    await user.click(botaoRemover);

    expect(screen.queryByText(mockProdutos[0].nome)).not.toBeInTheDocument();
    expect(screen.getByText(mockProdutos[1].nome)).toBeInTheDocument();
    expect(screen.getByText("Quantidade de produtos: 1")).toBeInTheDocument();

    const valorTotal = calculaValorComPorcentagemDeDesconto(
      Number(mockProdutos[1].preco),
      mockProdutos[1].desconto
    );
    expect(
      screen.getByText(`Valor total: R$ ${valorTotal.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("deve exibir 0.00 quando o cálculo do valor total resulta em nan", () => {
    (calculaValorComPorcentagemDeDesconto as jest.Mock).mockReturnValue(NaN);
    renderizarListagem([mockProdutos[0]]);
    expect(screen.getByText("Valor total: R$ 0.00")).toBeInTheDocument();
  });
});
