import { Aluno } from "../../entities/Aluno.ts";
import { Turma } from "../../entities/Turma.ts";
import { renderResumo, renderTabela } from "../views/render.ts";

declare const bootstrap: any;

export class AlunoController {
  constructor(private turma: Turma) {}

  public init(): void {
    const form = document.getElementById("formAluno") as HTMLFormElement;
    form.addEventListener("submit", (e) => this.handleSubmit(e));

    const tabela = document.getElementById("tabela-alunos") as HTMLTableSectionElement;
    tabela.addEventListener("click", e => this.handleDelete(e));
  }

  private handleDelete(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.classList.contains("btn-excluir")) return;

    const tr = target.closest("tr")!;
    const id  = tr.dataset.id!;
    this.turma.removeAluno(id);
    
    renderResumo(this.turma);
    renderTabela(this.turma);
  }

  private handleUpdateAluno() {
    
  }


  private handleSubmit(event: Event): void {
    event.preventDefault();
    const nome   = (document.getElementById("inputNome") as HTMLInputElement).value;
    const idade  = Number((document.getElementById("inputIdade") as HTMLInputElement).value);
    const altura = Number((document.getElementById("inputAltura") as HTMLInputElement).value) * 100;
    const peso   = Number((document.getElementById("inputPeso") as HTMLInputElement).value) * 1000;

    try {
      const aluno = new Aluno(nome, idade, altura, peso);
      this.turma.addAluno(aluno);
      renderResumo(this.turma);
      renderTabela(this.turma);

      (event.target as HTMLFormElement).reset();
      const modalEl = document.getElementById("modalAluno")!;
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();
    } catch (err: any) {
      alert(err.message);
    }
  }
}