//classe generica

class CarrinhoDeCompras<TipoDeProduto> {
    produtos: TipoDeProduto[] = [];

    add (ObjetoProduto: TipoDeProduto) {
        this.produtos.push(ObjetoProduto);
    }

    remove () {
        return this.produtos.pop();
    }
}