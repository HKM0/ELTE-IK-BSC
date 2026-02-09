//1 
const numbers = [5, 2, 15, -3, 6, -8, -2];
//A numbers tömb mindegyik eleméhez rendeld hozzá a négyzetét! (0,5 pont)
console.log(numbers.map((x)=> x*x))

//Keresd ki a numbers tömb legkisebb elemét! (Ha kell, használhatod az Infinity értéket JavaScriptben.) (0,5 pont)
console.log(numbers.reduce((szam, ujszam)=> szam>ujszam ? ujszam : szam ))
//--------------------------------------------------------------------------
const matrix = [
  [1, 0, 3],
  [0, 2, 0],
  [4, 5, 6],
  [0, 1, 0],
]
// Add meg a matrix mátrixnak azt a sorindexét, amelyben csupa 0 érték van! Ha nincs ilyen, -1-et adj vissza! (1 pont)
console.log(matrix.findIndex(x=> x.length == x.filter(y=> y==0).length))
// console.log(matrix.findIndex(x => x.every(y => y === 0)))

//--------------------------------------------------------------------------

const searchResults = {
  "Search": [
    {
      "Title": "The Hobbit: An Unexpected Journey",
      "Year": "2012",
      "imdbID": "tt0903624",
      "Type": "movie"
    },
    {
      "Title": "The Hobbit: The Desolation of Smaug",
      "Year": "2013",
      "imdbID": "tt1170358",
      "Type": "movie"
    },
    {
      "Title": "The Hobbit: The Battle of the Five Armies",
      "Year": "2014",
      "imdbID": "tt2310332",
      "Type": "movie"
    },
    {
      "Title": "The Hobbit",
      "Year": "1977",
      "imdbID": "tt0077687",
      "Type": "movie"
    },
    {
      "Title": "Lego the Hobbit: The Video Game",
      "Year": "2014",
      "imdbID": "tt3584562",
      "Type": "game"
    },
    {
      "Title": "The Hobbit",
      "Year": "1966",
      "imdbID": "tt1686804",
      "Type": "movie"
    },
    {
      "Title": "The Hobbit",
      "Year": "2003",
      "imdbID": "tt0395578",
      "Type": "game"
    },
    {
      "Title": "A Day in the Life of a Hobbit",
      "Year": "2002",
      "imdbID": "tt0473467",
      "Type": "movie"
    },
    {
      "Title": "The Hobbit: An Unexpected Journey - The Company of Thorin",
      "Year": "2013",
      "imdbID": "tt3345514",
      "Type": "movie"
    },
    {
      "Title": "The Hobbit: The Swedolation of Smaug",
      "Year": "2014",
      "imdbID": "tt4171362",
      "Type": "movie"
    }
  ],
  "totalResults": "51",
  "Response": "True"
}

//Add vissza azokat az IMDB azonosítókat (imdbID) a searchResults nevű mozikeresési eredményből, 
// amelyek olyan filmekhez tartoznak, 
// amelyek 2010 utániak (Year mező) és a típusuk (Type) movie. (1 pont)
const lista = searchResults["Search"].filter(result=> result["Year"]>2010 && result["Type"]==="movie").map(x=>x["imdbID"])
console.log(lista)

