import { CarrinhoDeCompras } from "./models/CarrinhoDeCompras.js";
import { Produto } from "./models/interfacesBase/ProdutoInterface.js";
import { CartView } from "./views/CardView.js";
import { CartController } from "./controllers/CardController.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    const carrinho = new CarrinhoDeCompras<Produto>();
    const view = new CartView<Produto>();
    const controller = new CartController(carrinho, view);
  } catch (error) {
    console.error("Erro ao inicializar a aplicacao:", error);
    const body = document.querySelector("body");
    if (body) {
      body.innerHTML = `<div class="alert alert-danger" role="alert">Ocorreu um erro ao carregar o carrinho. Tente novamente mais tarde.</div>`;
    }
  }
});
