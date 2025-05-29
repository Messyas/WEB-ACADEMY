import { CarrinhoDeCompras } from "../models/CarrinhoDeCompras.js";
import { Produto } from "../models/interfacesBase/ProdutoInterface.js";
import { CartView } from "../views/CardView.js";
import { Tv } from "../models/Tv.js";
import { Celular } from "../models/Celular.js";
import { Bicicleta } from "../models/Biclicleta.js";

export class CartController<T extends Produto> {
  constructor(private model: CarrinhoDeCompras<T>, private view: CartView<T>) {
    this.view.vincularRemoverItem(this.handleRemoveItem);
    this.view.vincularAtualizarQuantidade(this.handleUpdateQuantity);
    this.view.vincularEnvioFormularioAdicionarProduto(this.handleAddNewProduct);
    this.updateView();
  }

  handleAddItem = (produto: T, quantidade: number = 1): void => {
    this.model.adicionar(produto, quantidade);
    this.updateView();
  };

  handleRemoveItem = (id: string): void => {
    this.model.remover(id);
    this.updateView();
  };

  handleUpdateQuantity = (id: string, quantity: number): void => {
    this.model.atualizarQuantidade(id, quantity);
    this.updateView();
  };

  handleAddNewProduct = (formData: any): void => {
    let novoProduto: Produto | null = null;
    const {
      type: tipo,
      model: modelo,
      manufacturer: fabricante,
      value: valorFormData,
      memory: memoria,
      resolution: resolucao,
      size: tamanho,
      aro: aro,
    } = formData;

    try {
      if (!tipo || !modelo || !fabricante || !valorFormData) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      const valorNum = parseFloat(valorFormData);
      if (isNaN(valorNum) || valorNum <= 0) {
        alert("O valor do produto deve ser um número positivo.");
        return;
      }

      switch (tipo) {
        case "celular":
          novoProduto = new Celular(
            memoria || "N/A",
            modelo,
            fabricante,
            valorNum
          );
          break;
        case "tv":
          const resolucaoNum = parseInt(resolucao, 10);
          if (isNaN(resolucaoNum)) {
            alert("A resolução da TV deve ser um número.");
            return;
          }
          novoProduto = new Tv(
            resolucaoNum,
            tamanho || "N/A",
            modelo,
            fabricante,
            valorNum
          );
          break;
        case "bicicleta":
          const aroNum = parseInt(aro, 10);
          if (isNaN(aroNum)) {
            alert("O tamanho do aro deve ser um número.");
            return;
          }
          novoProduto = new Bicicleta(aroNum, modelo, fabricante, valorNum);
          break;
        default:
          alert("Tipo de produto inválido.");
          return;
      }

      if (novoProduto) {
        this.handleAddItem(novoProduto as T);
      }
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      alert("Ocorreu um erro ao adicionar o produto.");
    }
  };

  private updateView = (): void => {
    this.view.render(
      this.model.listarItens(),
      this.model.calcularValorTotal(),
      this.model.calcularQuantidadeTotal()
    );
  };
}
