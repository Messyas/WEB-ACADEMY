import { CarrinhoDeComprasInterface } from "./interfaces/CarrinhoDeComprasInterface";
import { Produto } from "./interfaces/ProdutoInterface";

//classe generica
export class CarrinhoDeCompras<T extends Produto>
  implements CarrinhoDeComprasInterface<T>
{
  public produtos: T[] = [];

  adicionar(item: T): void {
    this.produtos.push(item);
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
