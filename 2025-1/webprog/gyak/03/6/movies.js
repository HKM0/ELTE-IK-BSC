const movies = [
  {
    "id": 1,
    "title": "Inception",
    "director": "Christopher Nolan",
    "year": 2010
  },
  {
    "id": 2,
    "title": "The Godfather",
    "director": "Francis Ford Coppola",
    "year": 1972
  },
  {
    "id": 3,
    "title": "Pulp Fiction",
    "director": "Quentin Tarantino",
    "year": 1994
  },
  {
    "id": 4,
    "title": "The Dark Knight",
    "director": "Christopher Nolan",
    "year": 2008
  },
  {
    "id": 5,
    "title": "Fight Club",
    "director": "David Fincher",
    "year": 1999
  },
  {
    "id": 6,
    "title": "Forrest Gump",
    "director": "Robert Zemeckis",
    "year": 1994
  },
  {
    "id": 7,
    "title": "The Shawshank Redemption",
    "director": "Frank Darabont",
    "year": 1994
  },
  {
    "id": 8,
    "title": "The Matrix",
    "director": "Lana Wachowski, Lilly Wachowski",
    "year": 1999
  },
  {
    "id": 9,
    "title": "Star Wars: Episode IV - A New Hope",
    "director": "George Lucas",
    "year": 1977
  },
  {
    "id": 10,
    "title": "The Lord of the Rings: The Fellowship of the Ring",
    "director": "Peter Jackson",
    "year": 2001
  },
  {
    "id": 11,
    "title": "Gladiator",
    "director": "Ridley Scott",
    "year": 2000
  },
  {
    "id": 12,
    "title": "Schindler's List",
    "director": "Steven Spielberg",
    "year": 1993
  },
  {
    "id": 13,
    "title": "Saving Private Ryan",
    "director": "Steven Spielberg",
    "year": 1998
  },
  {
    "id": 14,
    "title": "Jurassic Park",
    "director": "Steven Spielberg",
    "year": 1993
  },
  {
    "id": 15,
    "title": "Titanic",
    "director": "James Cameron",
    "year": 1997
  },
  {
    "id": 16,
    "title": "The Silence of the Lambs",
    "director": "Jonathan Demme",
    "year": 1991
  },
  {
    "id": 17,
    "title": "Braveheart",
    "director": "Mel Gibson",
    "year": 1995
  },
  {
    "id": 18,
    "title": "The Green Mile",
    "director": "Frank Darabont",
    "year": 1999
  },
  {
    "id": 19,
    "title": "The Departed",
    "director": "Martin Scorsese",
    "year": 2006
  },
  {
    "id": 20,
    "title": "Avatar",
    "director": "James Cameron",
    "year": 2009
  },
  {
    "id": 21,
    "title": "Interstellar",
    "director": "Christopher Nolan",
    "year": 2014
  },
  {
    "id": 22,
    "title": "Django Unchained",
    "director": "Quentin Tarantino",
    "year": 2012
  },
  {
    "id": 23,
    "title": "The Avengers",
    "director": "Joss Whedon",
    "year": 2012
  },
  {
    "id": 24,
    "title": "Guardians of the Galaxy",
    "director": "James Gunn",
    "year": 2014
  },
  {
    "id": 25,
    "title": "Iron Man",
    "director": "Jon Favreau",
    "year": 2008
  },
  {
    "id": 26,
    "title": "The Wolf of Wall Street",
    "director": "Martin Scorsese",
    "year": 2013
  },
  {
    "id": 27,
    "title": "The Social Network",
    "director": "David Fincher",
    "year": 2010
  },
  {
    "id": 28,
    "title": "Black Panther",
    "director": "Ryan Coogler",
    "year": 2018
  },
  {
    "id": 29,
    "title": "The Revenant",
    "director": "Alejandro G. Iñárritu",
    "year": 2015
  },
  {
    "id": 30,
    "title": "Mad Max: Fury Road",
    "director": "George Miller",
    "year": 2015
  },
  {
    "id": 31,
    "title": "Whiplash",
    "director": "Damien Chazelle",
    "year": 2014
  },
  {
    "id": 32,
    "title": "La La Land",
    "director": "Damien Chazelle",
    "year": 2016
  },
  {
    "id": 33,
    "title": "Parasite",
    "director": "Bong Joon Ho",
    "year": 2019
  },
  {
    "id": 34,
    "title": "Once Upon a Time in Hollywood",
    "director": "Quentin Tarantino",
    "year": 2019
  },
  {
    "id": 35,
    "title": "The Irishman",
    "director": "Martin Scorsese",
    "year": 2019
  },
  {
    "id": 36,
    "title": "The Grand Budapest Hotel",
    "director": "Wes Anderson",
    "year": 2014
  },
  {
    "id": 37,
    "title": "The King's Speech",
    "director": "Tom Hooper",
    "year": 2010
  },
  {
    "id": 38,
    "title": "The Imitation Game",
    "director": "Morten Tyldum",
    "year": 2014
  },
  {
    "id": 39,
    "title": "Her",
    "director": "Spike Jonze",
    "year": 2013
  },
  {
    "id": 40,
    "title": "12 Years a Slave",
    "director": "Steve McQueen",
    "year": 2013
  },
  {
    "id": 41,
    "title": "Slumdog Millionaire",
    "director": "Danny Boyle",
    "year": 2008
  },
  {
    "id": 42,
    "title": "The Curious Case of Benjamin Button",
    "director": "David Fincher",
    "year": 2008
  },
  {
    "id": 43,
    "title": "No Country for Old Men",
    "director": "Joel Coen, Ethan Coen",
    "year": 2007
  },
  {
    "id": 44,
    "title": "The Dark Knight Rises",
    "director": "Christopher Nolan",
    "year": 2012
  },
  {
    "id": 45,
    "title": "American Beauty",
    "director": "Sam Mendes",
    "year": 1999
  },
  {
    "id": 46,
    "title": "Eternal Sunshine of the Spotless Mind",
    "director": "Michel Gondry",
    "year": 2004
  },
  {
    "id": 47,
    "title": "Requiem for a Dream",
    "director": "Darren Aronofsky",
    "year": 2000
  },
  {
    "id": 48,
    "title": "Oldboy",
    "director": "Park Chan-wook",
    "year": 2003
  },
  {
    "id": 49,
    "title": "Pan's Labyrinth",
    "director": "Guillermo del Toro",
    "year": 2006
  },
  {
    "id": 50,
    "title": "Memento",
    "director": "Christopher Nolan",
    "year": 2000
  },
  {
    "id": 51,
    "title": "A Beautiful Mind",
    "director": "Ron Howard",
    "year": 2001
  },
  {
    "id": 52,
    "title": "The Pianist",
    "director": "Roman Polanski",
    "year": 2002
  },
  {
    "id": 53,
    "title": "Amélie",
    "director": "Jean-Pierre Jeunet",
    "year": 2001
  },
  {
    "id": 54,
    "title": "City of God",
    "director": "Fernando Meirelles",
    "year": 2002
  },
  {
    "id": 55,
    "title": "The Usual Suspects",
    "director": "Bryan Singer",
    "year": 1995
  },
  {
    "id": 56,
    "title": "Léon: The Professional",
    "director": "Luc Besson",
    "year": 1994
  },
  {
    "id": 57,
    "title": "Goodfellas",
    "director": "Martin Scorsese",
    "year": 1990
  },
  {
    "id": 58,
    "title": "Seven",
    "director": "David Fincher",
    "year": 1995
  },
  {
    "id": 59,
    "title": "Blade Runner",
    "director": "Ridley Scott",
    "year": 1982
  },
  {
    "id": 60,
    "title": "Back to the Future",
    "director": "Robert Zemeckis",
    "year": 1985
  },
  {
    "id": 61,
    "title": "Apocalypse Now",
    "director": "Francis Ford Coppola",
    "year": 1979
  },
  {
    "id": 62,
    "title": "The Shining",
    "director": "Stanley Kubrick",
    "year": 1980
  },
  {
    "id": 63,
    "title": "A Clockwork Orange",
    "director": "Stanley Kubrick",
    "year": 1971
  },
  {
    "id": 64,
    "title": "The Exorcist",
    "director": "William Friedkin",
    "year": 1973
  },
  {
    "id": 65,
    "title": "Rocky",
    "director": "John G. Avildsen",
    "year": 1976
  },
  {
    "id": 66,
    "title": "Jaws",
    "director": "Steven Spielberg",
    "year": 1975
  },
  {
    "id": 67,
    "title": "Alien",
    "director": "Ridley Scott",
    "year": 1979
  },
  {
    "id": 68,
    "title": "E.T. the Extra-Terrestrial",
    "director": "Steven Spielberg",
    "year": 1982
  },
  {
    "id": 69,
    "title": "Indiana Jones and the Raiders of the Lost Ark",
    "director": "Steven Spielberg",
    "year": 1981
  },
  {
    "id": 70,
    "title": "The Sixth Sense",
    "director": "M. Night Shyamalan",
    "year": 1999
  },
  {
    "id": 71,
    "title": "The Truman Show",
    "director": "Peter Weir",
    "year": 1998
  },
  {
    "id": 72,
    "title": "Casablanca",
    "director": "Michael Curtiz",
    "year": 1942
  },
  {
    "id": 73,
    "title": "Gone with the Wind",
    "director": "Victor Fleming",
    "year": 1939
  },
  {
    "id": 74,
    "title": "Citizen Kane",
    "director": "Orson Welles",
    "year": 1941
  },
  {
    "id": 75,
    "title": "Vertigo",
    "director": "Alfred Hitchcock",
    "year": 1958
  },
  {
    "id": 76,
    "title": "Psycho",
    "director": "Alfred Hitchcock",
    "year": 1960
  },
  {
    "id": 77,
    "title": "Rear Window",
    "director": "Alfred Hitchcock",
    "year": 1954
  },
  {
    "id": 78,
    "title": "Singin' in the Rain",
    "director": "Stanley Donen, Gene Kelly",
    "year": 1952
  },
  {
    "id": 79,
    "title": "It's a Wonderful Life",
    "director": "Frank Capra",
    "year": 1946
  },
  {
    "id": 80,
    "title": "Dr. Strangelove",
    "director": "Stanley Kubrick",
    "year": 1964
  },
  {
    "id": 81,
    "title": "The Sound of Music",
    "director": "Robert Wise",
    "year": 1965
  },
  {
    "id": 82,
    "title": "Lawrence of Arabia",
    "director": "David Lean",
    "year": 1962
  },
  {
    "id": 83,
    "title": "Ben-Hur",
    "director": "William Wyler",
    "year": 1959
  },
  {
    "id": 84,
    "title": "The Bridge on the River Kwai",
    "director": "David Lean",
    "year": 1957
  },
  {
    "id": 85,
    "title": "The Great Dictator",
    "director": "Charlie Chaplin",
    "year": 1940
  },
  {
    "id": 86,
    "title": "City Lights",
    "director": "Charlie Chaplin",
    "year": 1931
  },
  {
    "id": 87,
    "title": "Modern Times",
    "director": "Charlie Chaplin",
    "year": 1936
  },
  {
    "id": 88,
    "title": "Metropolis",
    "director": "Fritz Lang",
    "year": 1927
  },
  {
    "id": 89,
    "title": "Sunset Boulevard",
    "director": "Billy Wilder",
    "year": 1950
  },
  {
    "id": 90,
    "title": "12 Angry Men",
    "director": "Sidney Lumet",
    "year": 1957
  },
  {
    "id": 91,
    "title": "The Good, the Bad and the Ugly",
    "director": "Sergio Leone",
    "year": 1966
  },
  {
    "id": 92,
    "title": "Once Upon a Time in the West",
    "director": "Sergio Leone",
    "year": 1968
  },
  {
    "id": 93,
    "title": "The Lion King",
    "director": "Roger Allers, Rob Minkoff",
    "year": 1994
  },
  {
    "id": 94,
    "title": "Spirited Away",
    "director": "Hayao Miyazaki",
    "year": 2001
  },
  {
    "id": 95,
    "title": "My Neighbor Totoro",
    "director": "Hayao Miyazaki",
    "year": 1988
  },
  {
    "id": 96,
    "title": "Princess Mononoke",
    "director": "Hayao Miyazaki",
    "year": 1997
  },
  {
    "id": 97,
    "title": "Grave of the Fireflies",
    "director": "Isao Takahata",
    "year": 1988
  },
  {
    "id": 98,
    "title": "Akira",
    "director": "Katsuhiro Otomo",
    "year": 1988
  },
  {
    "id": 99,
    "title": "Ghost in the Shell",
    "director": "Mamoru Oshii",
    "year": 1995
  },
  {
    "id": 100,
    "title": "Neon Genesis Evangelion: The End of Evangelion",
    "director": "Hideaki Anno",
    "year": 1997
  }
]

