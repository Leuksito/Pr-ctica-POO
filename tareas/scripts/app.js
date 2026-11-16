const list = document.getElementById("tareas");
const counter = document.getElementById("contador");
let tasks = [];

function updateCounter() {
  const pending = tasks.filter((task) => !task.completed).length;
  counter.textContent = pending === 1 ? "1 tarea pendiente" : `${pending} tareas pendientes`;
}

async function init() {
  try {
    const response = await fetch("data/tasks.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    tasks = data.map(Task.fromJSON);
    list.replaceChildren(...tasks.map((task) => task.render()));
    list.addEventListener("click", updateCounter);
    updateCounter();
  } catch (error) {
    list.textContent =
      "No se pudo cargar data/tasks.json. Abre la página con un servidor local " +
      "(por ejemplo: python3 -m http.server) en lugar de hacer doble clic en el archivo.";
    console.error(error);
  }
}

init();
