/**
 * Task: una tarea con texto, categoría y estado.
 * render() pinta la tarea con un botón "Completar" que pone
 * this.completed = true y tacha el texto en pantalla.
 */
class Task {
  constructor({ text, category, completed = false }) {
    this.text = text;
    this.category = category;
    this.completed = completed;
    this.element = null;
  }

  static fromJSON(data) {
    return new Task(data);
  }

  /** Crea el elemento <li> de la tarea y lo devuelve. */
  render() {
    const item = document.createElement("li");
    item.className = "task";

    const body = document.createElement("div");
    body.className = "task__body";

    this.textElement = document.createElement("span");
    this.textElement.className = "task__text";
    this.textElement.textContent = this.text;

    const category = document.createElement("span");
    category.className = "task__category";
    category.textContent = this.category;

    body.append(this.textElement, category);

    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.className = "task__button";
    this.button.textContent = "Completar";
    this.button.addEventListener("click", () => this.complete());

    item.append(body, this.button);
    this.element = item;
    this.refresh();
    return item;
  }

  /** Marca la tarea como completada y actualiza la pantalla. */
  complete() {
    this.completed = true;
    this.refresh();
  }

  /** Sincroniza el DOM con el estado actual de this.completed. */
  refresh() {
    if (!this.element) return;
    this.element.classList.toggle("task--done", this.completed);
    this.button.disabled = this.completed;
  }
}
