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
}

(document.getElementById("button-add") as HTMLButtonElement).addEventListener(
  "click",
  addTask
);
