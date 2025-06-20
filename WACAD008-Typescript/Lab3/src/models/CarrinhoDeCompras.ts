import { CarrinhoDeComprasInterface } from "./interfacesBase/CarrinhoDeComprasInterface.js";
import { ItemCarrinho } from "./interfacesBase/ItemCarrinhoInterface.js";
import { Produto } from "./interfacesBase/ProdutoInterface.js";

export class CarrinhoDeCompras<T extends Produto>
  implements CarrinhoDeComprasInterface<T>
{
  public itens: Map<string, ItemCarrinho<T>> = new Map();

  adicionar(produto: T, quantidade: number = 1): void {
    if (quantidade <= 0) return;

    if (this.itens.has(produto.id)) {
      const itemExistente = this.itens.get(produto.id)!;
      itemExistente.quantidade += quantidade;
    } else {
      this.itens.set(produto.id, { produto, quantidade });
    }
    console.log(`Produto ${produto.modelo} adicionado/atualizado.`);
  }

  remover(produtoId: string): boolean {
    const removido = this.itens.delete(produtoId);
    console.log(`Produto ${produtoId} removido: ${removido}`);
    return removido;
  }

  atualizarQuantidade(produtoId: string, novaQuantidade: number): void {
    if (novaQuantidade <= 0) {
      this.remover(produtoId);
    } else if (this.itens.has(produtoId)) {
      this.itens.get(produtoId)!.quantidade = novaQuantidade;
      console.log(
        `Quantidade do produto ${produtoId} atualizada para ${novaQuantidade}.`
      );
    }
  }

  listarItens(): ItemCarrinho<T>[] {
    return Array.from(this.itens.values());
  }

  calcularQuantidadeTotal(): number {
    let total = 0;
    for (const item of this.itens.values()) {
      total += item.quantidade;
    }
    return total;
  }

  calcularValorTotal(): number {
    let total = 0;
    for (const item of this.itens.values()) {
      total += item.produto.valor * item.quantidade;
    }
    return total;
  }
}
