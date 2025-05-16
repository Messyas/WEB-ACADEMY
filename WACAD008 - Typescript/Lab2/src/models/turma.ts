import { Aluno } from "./aluno.ts";
export class Turma {
  constructor(
    private id: string,
    private nome: string,
    private alunos: Aluno[] = []
  ) {}

  getAlunos(): Aluno[] {
    return this.alunos;
  }

  addAluno(aluno: Aluno): void {
    this.alunos.push(aluno);
  }

  getNumAlunos(): number {
    return this.alunos.length;
  }

  getMediaAlturas(): string {
    const numeroAlunos = this.getNumAlunos();
    const totalAlturas = this.alunos
      .map((aluno) => aluno.getAltura())
      .reduce((alturasSoma, altura) => alturasSoma + altura, 0);

    const mediaAlturas = totalAlturas / numeroAlunos;
    return (mediaAlturas / 100).toFixed(2);
  }

  getMediaPesos(): string {
    const numeroAlunos = this.getNumAlunos();
    const totalPesos = this.alunos
    .map((aluno) => aluno.getPeso())
    .reduce((pesos, peso) => pesos + peso,0);

    const mediaPesos = totalPesos / numeroAlunos;
    return (mediaPesos / 1000).toFixed(3);
  }
}
