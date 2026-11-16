const container = document.getElementById("cartelera");

async function init() {
  try {
    const response = await fetch("data/movies.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    const movies = data.map(Movie.fromJSON);
    container.replaceChildren(...movies.map((movie) => movie.render()));
  } catch (error) {
    container.textContent =
      "No se pudo cargar data/movies.json. Abre la página con un servidor local " +
      "(por ejemplo: python3 -m http.server) en lugar de hacer doble clic en el archivo.";
    console.error(error);
  }
}

init();
