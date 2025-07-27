import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  FavoritosProvider,
  useFavoritosContext,
} from "@/app/State/FavoritosProvider";
import CardProduto from "@/app/components/CardProduto/CardProduto";
import ListagemFavoritos from "@/app/components/ListagemFavoritos/ListagemFavoritos";
import { mockProdutos } from "@/app/mocks/produtos";

const AppDeTeste = ({ produto }: { produto: Produto }) => {
  const { setFavoritos } = useFavoritosContext();
  return (
    <div>
      <CardProduto produto={produto} setFavoritos={setFavoritos} />
      <ListagemFavoritos />
    </div>
  );
};

describe("CardProduto com Favoritos", () => {
  it("deve atualizar o status do botão ao adicionar um item", async () => {
    const user = userEvent.setup();
    const [produto] = mockProdutos;

    render(
      <FavoritosProvider>
        <AppDeTeste produto={produto} />
      </FavoritosProvider>
    );

    const botaoAdicionar = screen.getByRole("button", {
      name: /Adicionar aos favoritos/i,
    });

    expect(botaoAdicionar).toBeInTheDocument();
    expect(botaoAdicionar).not.toBeDisabled();

    await user.click(botaoAdicionar);

    const botaoAdicionado = screen.getByRole("button", {
      name: /Adicionado aos favoritos/i,
    });
    expect(botaoAdicionado).toBeInTheDocument();
    expect(botaoAdicionado).toBeDisabled();
  });
});
