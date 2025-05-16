export class Aluno {
  private readonly id: string = crypto.randomUUID();

  constructor(
    private nome: string,
    private idade: number,
    private altura: number,
    private peso: number
  ) {
    this.validate();
  }

  private validate() {
    if (!this.nome.trim()) throw new Error("Nome nao pode ser vazio");
    if (this.idade < 0 || this.idade > 120) throw new Error("Idade invalida");
    if (this.altura <= 0) throw new Error("Altura deve ser positiva");
    if (this.peso <= 0) throw new Error("Peso deve ser positivo");
  }

  getId(): string | number {
    return this.id;
  }

  getNome() {
    return this.nome;
  }
  getIdade(): number {
    return this.idade;
  }

  getAltura(): number {
    return this.altura;
  }

  getPeso(): number {
    return this.peso;
  }
}
