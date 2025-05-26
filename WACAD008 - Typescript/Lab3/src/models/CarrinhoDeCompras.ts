import { CarrinhoDeComprasInterface } from "./interfaces/CarrinhoDeComprasInterface";
import { ItemCarrinho } from "./interfaces/ItemCarrinho";
import { Produto } from "./interfaces/ProdutoInterface";

//classe generica
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
    console.log('produto adicionado');
  }

  removerPorIndice(indice: number): boolean {
    return true; //acho que vou fazer isso por nome, nao sei se add id nesse caso, pesquisar pra ver se faz sentido
  }

  calcularQuantidade(): number {
    return this.produtos.length;
  }

  calcularValorTotal(): number {
    return this.produtos.reduce((acc, p) => acc + p.valor, 0);
  }
}
