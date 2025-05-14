import { Task } from '../entity/Task.ts';

export class Renderer {
  constructor(private readonly container: HTMLDivElement) {}

  render(tasks: Task[], onEdit: (id: string) => void, onRemove: (id: string) => void): void {
    this.container.innerHTML = '';
    tasks.forEach(task => this.renderOne(task, onEdit, onRemove));
  }

  private renderOne(task: Task, onEdit: (id: string) => void, onRemove: (id: string) => void): void {
    const [ id, title, ini, fim, desc ] = task.toTuple();
    const item = document.createElement('div');
    item.className = 'task-item';

    item.innerHTML = `
    <h3 class="task-title">${title}</h3>
    <p class="task-meta">Início: ${ini.toLocaleString()}</p>
    <p class="task-meta">Fim: ${fim.toLocaleDateString()}</p>
    <p class="task-description">${desc}</p>
    <div class="task-buttons-container">
      <button class="button-edit">Editar</button>
      <button class="button-remove">Remover</button>
    </div>
  `;
    item.querySelector<HTMLButtonElement>('.button-edit')!
      .addEventListener('click', () => onEdit(id));
    item.querySelector<HTMLButtonElement>('.button-remove')!
      .addEventListener('click', () => onRemove(id));
      
    this.container.appendChild(item);
  }
}