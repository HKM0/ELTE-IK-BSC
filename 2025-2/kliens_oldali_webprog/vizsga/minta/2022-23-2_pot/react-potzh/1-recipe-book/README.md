## 1. Receptkönyv (1-recipe-book, 10 pont)

Ebben a feladatban egy recepteket tartalmazó komponenst kell elkészítened. A `recipes.js` fájlban megtalálhatod a feladathoz szükséges adatokat, az alábbi formában:

```js
export const recipes = [
  {
    "name": "Csirkés Caesar saláta",
    "preparationTime": "30 perc",
    "description": "Friss és ízletes csirkés Caesar saláta ropogós zöldségekkel.",
    "ingredients": [
      "2 csirkemell filé",
      "Romaine saláta",
      "Paradicsom",
      "Kenyérkockák",
      "Caesar öntet"
    ],
    "image": "/assets/caesar.png"
  },
  // ...
]
```

- a. (2 pont) Az `App` komponensben töltsd be a `recipes.js` fájlban megadott listát, amely tartalmazza a receptekhez tartozó adatokat. A listát add át a `RecipeList` komponensnek, és jelenítsd az összes receptet, és a receptekhez tartozó adatokat a megadott helyenken!
- b. (3 pont) Kattintással lehessen kiválasztani egy receptet! A recept kártyájára kattintáskor tárold el egy állapotváltozóban a kiválasztott recepthez tartozó objektumot az `App` komponensben. Alapértelmezetten az állapotváltozó értéke null legyen!
- c. (2 pont)Az `App` komponensben állítsd be, hogy az állapotváltozó értékétől függően vagy a `RecipeDetails` komponens jelenjen meg, ha ki van választva egy recept, ha pedig null akkor a `RecipeList` jelenjen meg!
- d. (2 pont) Add át a `RecipeDetails` komponensnek a kiválasztott receptet! Jelenítsd meg a `RecipeDetails` komponensben a kiválasztott recepthez tartozó adatokat a megfelelő helyekre, amelyeket kommentekkel jelöltünk. (name, description, ingredients, image).
- e. (1 pont) A vissza gombra kattintással állítsuk vissza az állapotváltozó értékét nullra, és jelenjen meg újra a `RecipeList` komponens.