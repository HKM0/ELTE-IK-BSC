const RecipeDetails = ({ recipe, handleRecipeSelect }) => {
    return (
      <div className="max-w-lg rounded overflow-hidden shadow-lg mx-auto mt-8 bg-blue-300">
        <img
          className="w-full h-200px object-cover"
          src={"/assets/cake.png" /* TODO: Add meg a hozzátartozó képet */}
          alt="Recipe"
        />
        <div className="px-6 py-3">
          <div className="font-bold text-xl mb-2">{"Étel" /* TODO: Jelenítsd meg a recept nevét */}</div>
          <p className="text-gray-700 text-base">{"Finom" /* TODO: Jelenítsd meg a recept leírását */}</p>
        </div>
        <div className="px-6 py-4">
          <h2 className="font-bold mb-2">Hozzávalók:</h2>
          <ul className="list-disc pl-6">
              <li className="text-gray-700">
                {"Bors" /* TODO: Listázd ki a hozzávalókat */}
              </li>
              <li className="text-gray-700">
                {"Só" /* TODO: Listázd ki a hozzávalókat */}
              </li>
          </ul>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded my-2">
            Vissza {/*TODO: Erre gombra kattintással állítsuk vissza az állapot értékét nullra, 
            és ezáltal jelenjen meg a RecipeList ismét */}
          </button>
        </div>
      </div>
    );
  };
  

export default RecipeDetails;