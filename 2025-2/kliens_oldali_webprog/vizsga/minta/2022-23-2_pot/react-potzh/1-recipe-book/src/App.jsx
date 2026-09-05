import React, { useState } from 'react';
import { recipes } from './data/recipes';
import RecipeDetails from './RecipeDetails';
import RecipeList from './RecipeList';

const App = () => {
  const recipes = []; // TODO: Cseréld le ezt a változót, hogy a beimportált listára hivatkozzon
  const selectedRecipe = null; // TODO: Cseréld le ezt a változót, hogy a komponens belső állapotára hivatkozzon
  const handleRecipeSelect = (id) => {
    // TODO: Állítsd be a kiválasztott receptet, amelyiknek a kártyájára rákattintunk
  };
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mt-8 mb-4">Recipe Book</h1>
        {/* TODO: Ha van kiválasztva recept, a RecipeDetails 
        komponens jelenjen meg, egyébként a lista*/}
        <RecipeList recipes={recipes} handleRecipeSelect={handleRecipeSelect} />
        <RecipeDetails recipe={selectedRecipe} handleRecipeSelect={handleRecipeSelect} /> 
    </div>
  );
};

export default App;
