import { Turma } from "../../entities/Turma.ts";
import { Aluno } from "../../entities/Aluno.ts";

export function renderResumo(turma: Turma): void {
  document.getElementById("total-alunos")!.textContent = String(turma.getNumAlunos());
  document.getElementById("media-alturas")!.textContent = turma.getMediaAlturas();
  document.getElementById("media-pesos")!.textContent = turma.getMediaPesos();
}

export function renderTabela(turma: Turma): void {
  const tbody = document.getElementById("tabela-alunos")! as HTMLTableSectionElement;
  tbody.innerHTML = "";
  turma.getAlunos().forEach((aluno: Aluno) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${aluno.getId()}</td>
      <td>${aluno.getNome()}</td>
      <td>${aluno.getIdade()}</td>
      <td>${(aluno.getAltura()/100).toFixed(2)}</td>
      <td>${(aluno.getPeso()/1000).toFixed(3)}</td>
    `;
    tbody.appendChild(tr);
  });
}