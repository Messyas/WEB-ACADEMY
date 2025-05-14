//tupla para representar os registros
type Task = [string, string, Date, Date, string];

let taskList: Task[] = [];

function addTask(): void {
  const title = (document.getElementById("title") as HTMLInputElement).value;
  const iniDate = new Date(
    (document.getElementById("init-date") as HTMLInputElement).value
  );
  const finalDate = new Date(
    (document.getElementById("final-date") as HTMLInputElement).value
  );
  const description = (
    document.getElementById("description") as HTMLInputElement
  ).value;

  const id = crypto.randomUUID();

  const newTask: Task = [id, title, iniDate, finalDate, description];
  taskList.push(newTask);

  console.log("Tarefa adiocionada:", newTask);
  addTaskToList();
}

function addTaskToList() {
  const containerList = document.querySelector(
    ".list-itens-container"
  ) as HTMLDivElement;
  containerList.innerHTML = "";
  taskList.forEach(([id, title, iniDate, finalDate, description]) => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
      <div class="task-item">
        <h3 class="task-title">${title}</h3>
        <p class="task-meta">Início: ${iniDate.toLocaleString()}</p>
        <p class="task-meta">Fim: ${finalDate.toLocaleDateString()}</p>
        <p class="task-description">${description}</p>
        <div class="task-buttons-container">
          <button class="button-edit" onclick="EditTask('${id}')">Editar</button>
          <button class="button-remove" onclick="removeTask('${id}')">Remover</button>
        </div>
      </div>
    `;
    containerList.appendChild(itemDiv);
  });
}

(document.getElementById("button-add") as HTMLButtonElement).addEventListener(
  "click",
  addTask
);
