import { Aluno } from "./Aluno.ts";

export class Turma {
  private readonly id: string = crypto.randomUUID();
  private alunos: Aluno[] = [];

  constructor(private nome: string) {}

  public getId(): string {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public addAluno(aluno: Aluno): void {
    this.alunos.push(aluno);
  }

  public removeAluno(id: string): void {
    this.alunos = this.alunos.filter(a => a.getId() !== id);
  }

  public getAlunos(): Aluno[] {
    return [...this.alunos];
  }

  public getNumAlunos(): number {
    return this.alunos.length;
  }

  public getMediaAlturas(): string {
    if (this.alunos.length === 0) return "0.00";
    const total = this.alunos.reduce((sum, a) => sum + a.getAltura(), 0);
    return (total / this.alunos.length / 100).toFixed(2);
  }

  public getMediaPesos(): string {
    if (this.alunos.length === 0) return "0.000";
    const total = this.alunos.reduce((sum, a) => sum + a.getPeso(), 0);
    return (total / this.alunos.length / 1000).toFixed(3);
  }
}
