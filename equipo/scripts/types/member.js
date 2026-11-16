/**
 * Member: un miembro del equipo y su tarjeta.
 */
class Member {
  constructor({ name, role, department, available }) {
    this.name = name;
    this.role = role;
    this.department = department;
    this.available = available;
  }

  static fromJSON(data) {
    return new Member(data);
  }

  /** Iniciales para el avatar (máximo dos letras). */
  get initials() {
    return this.name
      .split(" ")
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  render() {
    const card = document.createElement("article");
    card.className = "member";

    const avatar = document.createElement("div");
    avatar.className = "member__avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = this.initials;

    const info = document.createElement("div");
    info.className = "member__info";

    const name = document.createElement("h2");
    name.className = "member__name";
    name.textContent = this.name;

    const role = document.createElement("p");
    role.className = "member__role";
    role.textContent = `${this.role}, ${this.department}`;

    const status = document.createElement("p");
    status.className = "member__status " + (this.available ? "member__status--on" : "member__status--off");
    status.textContent = this.available ? "Disponible" : "No disponible";

    info.append(name, role, status);
    card.append(avatar, info);
    return card;
  }
}
