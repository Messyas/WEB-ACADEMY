const { verificarDisponibilidadeEstoque } = require("../utils/validacoes");

describe("verificarDisponibilidadeEstoque()", () => {
  it("deve retornar false quando a quantidade solicitada for maior que o estoque", () => {
    expect(verificarDisponibilidadeEstoque("laptop", 11)).toBe(false);
  });

  it("deve retornar true quando a quantidade solicitada for menor a do estoque", () => {
    expect(verificarDisponibilidadeEstoque("laptop", 2)).toBe(true);
  });

  it("deve retornar true quando a quantidade solicitada for igual ao estoque", () => {
    expect(verificarDisponibilidadeEstoque("headphone", 5)).toBe(true);
  });

  it("deve retornar false para um produto sem estoque", () => {
    expect(verificarDisponibilidadeEstoque("livro", 1)).toBe(false);
  });

  it("deve retornar false para um valor negativo", () => {
    expect(verificarDisponibilidadeEstoque("livro", -11)).toBe(false);
  });

  it("quantidade com caracteres nao validos deve ser false", () => {
    expect(verificarDisponibilidadeEstoque("livro", "*&&@")).toBe(false);
  });

  it("deve retornar false para um produto que nao existe no estoque", () => {
    expect(verificarDisponibilidadeEstoque("teclado gamer", 1)).toBe(false);
  });
});
