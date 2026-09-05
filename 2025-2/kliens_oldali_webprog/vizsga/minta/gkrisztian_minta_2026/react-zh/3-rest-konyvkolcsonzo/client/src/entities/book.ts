// a) Írd meg a Book típust az API dokumentáció alapján!
export interface Book {
  // TODO
  id: number,
  title: string,
  author: string,
  year: number,
  available: boolean,
  currentBorrower: string | null
}

/*
{
  "total": 8,
  "limit": 8,
  "skip": 0,
  "data": [
    {
      "id": 1,
      "title": "A Gyűrűk Ura",
      "author": "J.R.R. Tolkien",
      "year": 1954,
      "available": false,
      "currentBorrower": "Nagy János"
    },
    {
      "id": 2,
      "title": "Harry Potter és a bölcsek köve",
      "author": "J.K. Rowling",
      "year": 1997,
      "available": false,
      "currentBorrower": "Kiss Éva"
    },
    {
      "id": 3,
      "title": "Száz év magány",
      "author": "Gabriel García Márquez",
      "year": 1967,
      "available": false,
      "currentBorrower": "Szabó Péter"
    },
    {
      "id": 4,
      "title": "Az öreg halász és a tenger",
      "author": "Ernest Hemingway",
      "year": 1952,
      "available": true,
      "currentBorrower": null
    },
    {
      "id": 5,
      "title": "1984",
      "author": "George Orwell",
      "year": 1949,
      "available": true,
      "currentBorrower": null
    },
    {
      "id": 6,
      "title": "A kis herceg",
      "author": "Antoine de Saint-Exupéry",
      "year": 1943,
      "available": true,
      "currentBorrower": null
    },
    {
      "id": 7,
      "title": "Don Quijote",
      "author": "Miguel de Cervantes",
      "year": 1605,
      "available": true,
      "currentBorrower": null
    },
    {
      "id": 8,
      "title": "Bűn és bűnhődés",
      "author": "Fjodor Dosztojevszkij",
      "year": 1866,
      "available": true,
      "currentBorrower": null
    }
  ]
}
*/