/**
 * Movie: modelo de una película y su tarjeta en la cartelera.
 * Las películas con puntuación >= 8 se marcan como destacadas
 * (borde dorado + estrella + etiqueta "Imprescindible").
 */
class Movie {
  static HIGHLIGHT_THRESHOLD = 8;

  constructor({ title, director, year, rating }) {
    this.title = title;
    this.director = director;
    this.year = year;
    this.rating = rating;
  }

  static fromJSON(data) {
    return new Movie(data);
  }

  get isHighlighted() {
    return this.rating >= Movie.HIGHLIGHT_THRESHOLD;
  }

  /** Crea y devuelve la tarjeta como elemento del DOM. */
  render() {
    const card = document.createElement("article");
    card.className = "movie-card" + (this.isHighlighted ? " movie-card--gold" : "");

    if (this.isHighlighted) {
      const badge = document.createElement("span");
      badge.className = "movie-card__badge";
      badge.textContent = "★ Imprescindible";
      card.appendChild(badge);
    }

    const title = document.createElement("h2");
    title.className = "movie-card__title";
    title.textContent = this.title;

    const meta = document.createElement("p");
    meta.className = "movie-card__meta";
    meta.textContent = `${this.director}, ${this.year}`;

    const score = document.createElement("p");
    score.className = "movie-card__score";
    score.setAttribute("aria-label", `Puntuación ${this.rating} sobre 10`);
    const value = document.createElement("strong");
    value.textContent = this.rating;
    score.append(value, " / 10");

    card.append(title, meta, score);
    return card;
  }
}
