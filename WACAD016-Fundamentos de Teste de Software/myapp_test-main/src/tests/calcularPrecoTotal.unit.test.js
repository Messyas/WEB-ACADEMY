const { calcularPrecoTotal } = require("../utils/validacoes");

describe("calcularPrecoTotal()", () => {
  it("deve calcular a soma dos precos de varios produtos corretamente", () => {
    const produtos = [
      { nome: "Laptop", price: 3500.5 },
      { nome: "Mouse", price: 150.0 },
      { nome: "Teclado", price: 250.5 },
    ];
    expect(calcularPrecoTotal(produtos)).toBe(3901);
  });

  it("deve retornar o preco correto de um item da lista", () => {
    const produtos = [{ nome: "Monitor", price: 1200 }];
    expect(calcularPrecoTotal(produtos)).toBe(1200);
  });

  it("deve retornar 0 quando a lista de produtos for vazia", () => {
    const produtos = [];
    expect(calcularPrecoTotal(produtos)).toBe(0);
  });

  it("deve lidar corretamente com produtos que tem preco zero", () => {
    const produtos = [
      { nome: "Produto A", price: 100 },
      { nome: "Produto B (Grátis)", price: 0 },
      { nome: "Produto C", price: 50 },
    ];
    expect(calcularPrecoTotal(produtos)).toBe(150);
  });

  it("deve somar corretamente precos com casas decimais", () => {
    const produtos = [
      { nome: "Item A", price: 10.75 },
      { nome: "Item B", price: 5.25 },
    ];
    expect(calcularPrecoTotal(produtos)).toBeCloseTo(16.0);
  });
});
