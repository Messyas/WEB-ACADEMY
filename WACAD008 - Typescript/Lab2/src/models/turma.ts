import { Aluno } from "./aluno"
class turma {
    id: string;
    nome: string;
    alunos: Aluno[];

    constructor (id: string, nome: string, alunos?: Aluno[] ) {
        this.id = id;
        this.nome = nome;
        this.alunos = alunos ?? [];
    }

    addAluno (aluno: Aluno): void {
        this.alunos.push(aluno);
    }

    getNumAlunos (): number {
        return this.alunos.length;
    }

    getMediaAlturas (): string {
        const numeroAlunos = this.getNumAlunos();
        const somaTotalCm = this.alunos.reduce((alturaCm, aluno) => alturaCm + aluno.altura, 0);
        const mediaCm = somaTotalCm / numeroAlunos;
        return (mediaCm / 100).toFixed(2);
    }

    getMediaPesos(): string {
        const numeroAlunos = this.getNumAlunos();
        const somaTotalKg = this.alunos.reduce((alturaKg, aluno) => alturaKg + aluno.peso, 0);
        const mediaKg = somaTotalKg / numeroAlunos;
        return (mediaKg / 100).toFixed(3);
    }
}