//tupla para representar os registros
type Task = [number, string, Date, Date, string];

let taskList: Task[] = [];

function addTask(): void {
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const iniDate = new Date((document.getElementById('init-date') as HTMLInputElement).value);
    const finalDate = new Date((document.getElementById('final-date') as HTMLInputElement).value);
    const description = (document.getElementById('title') as HTMLInputElement).value;

    const id = 

}
