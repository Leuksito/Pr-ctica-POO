class Main {
  constructor(container, select) {
    this.container = container;
    this.select = select;
    this.members = [];
    this.department = "";
  }

  async init() {
    try {
      const response = await fetch("data/team.json");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      this.members = data.map(Member.fromJSON);
      this.populateSelect();
      this.select.addEventListener("change", () => {
        this.department = this.select.value;
        this.render();
      });
      this.render();
    } catch (error) {
      this.container.textContent =
        "No se pudo cargar data/team.json. Abre la página con un servidor local " +
        "(por ejemplo: python3 -m http.server) en lugar de hacer doble clic en el archivo.";
      console.error(error);
    }
  }

  /** Rellena el <select> con los departamentos que existen en los datos. */
  populateSelect() {
    const departments = [...new Set(this.members.map((m) => m.department))].sort();
    for (const department of departments) {
      const option = document.createElement("option");
      option.value = department;
      option.textContent = department;
      this.select.appendChild(option);
    }
  }

  /** Pinta solo los miembros del departamento seleccionado (o todos). */
  render() {
    const visible = this.department
      ? this.members.filter((m) => m.department === this.department)
      : this.members;

    if (visible.length === 0) {
      this.container.textContent = "No hay miembros en este departamento.";
      return;
    }
    this.container.replaceChildren(...visible.map((m) => m.render()));
  }
}

new Main(
  document.getElementById("equipo"),
  document.getElementById("departamento")
).init();
