const { primeiroNome } = require("../utils/validacoes");

describe("primeiroNome()", () => {
  it("deve retornar o primeiro nome quando o nome completo e fornecido", () => {
    const fullName = "John Doe Calvo";
    const result = primeiroNome(fullName);
    expect(result).toBe("John");
  });

  it("deve retornar o mesmo nome quando nao ha espaco em branco", () => {
    const name = "Saitama";
    const result = primeiroNome(name);
    expect(result).toBe(name);
  });

  it("deve retornar o primeiro nome corretamente quando ha espaco em branco no inicio", () => {
    const name = " Alice Test";
    const result = primeiroNome(name);
    expect(result).toBe("Alice");
  });

  it("deve retornar o primeiro nome corretamente quando a espaco em branco no final", () => {
    const name = "Alice Test";
    const result = primeiroNome(name);
    expect(result).toBe("Alice");
  });
});
