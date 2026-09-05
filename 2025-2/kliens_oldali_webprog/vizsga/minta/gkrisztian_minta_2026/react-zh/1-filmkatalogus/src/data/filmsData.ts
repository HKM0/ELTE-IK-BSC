export interface Film {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  country: string;
  poster: string;
}

export interface Review {
  filmId: number;
  score: number;
  comment: string;
}

const films: Film[] = [
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010, genre: "Sci-Fi / Thriller", country: "USA", poster: "https://placehold.co/60x90/6366f1/white?text=1" },
  { id: 2, title: "A keresztapa", director: "Francis Ford Coppola", year: 1972, genre: "Bűnügyi dráma", country: "USA", poster: "https://placehold.co/60x90/6366f1/white?text=2" },
  { id: 3, title: "Schindler listája", director: "Steven Spielberg", year: 1993, genre: "Történelmi dráma", country: "USA", poster: "https://placehold.co/60x90/6366f1/white?text=3" },
  { id: 4, title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994, genre: "Krimi / Dráma", country: "USA", poster: "https://placehold.co/60x90/6366f1/white?text=4" },
  { id: 5, title: "A mátrix", director: "Lana és Lilly Wachowski", year: 1999, genre: "Sci-Fi / Akció", country: "USA / Ausztrália", poster: "https://placehold.co/60x90/6366f1/white?text=5" },
  { id: 6, title: "Interstellar", director: "Christopher Nolan", year: 2014, genre: "Sci-Fi / Kaland", country: "USA / Egyesült Királyság", poster: "https://placehold.co/60x90/6366f1/white?text=6" },
];

export default films;
