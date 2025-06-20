import { Turma } from "./entities/Turma.ts";
import { AlunoController } from "./presentation/controllers/alunoController.ts";
import { renderResumo, renderTabela } from "./presentation/views/render.ts";

const turma = new Turma("Turma1");
const alunoController = new AlunoController(turma);

document.addEventListener("DOMContentLoaded", () => {
  renderResumo(turma);
  renderTabela(turma);
  alunoController.init();
});