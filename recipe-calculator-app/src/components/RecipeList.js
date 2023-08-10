// src/components/RecipeList.js
import React from 'react';
import recipesData from '../data/recipesData';

function RecipeList() {
  const recipeNames = Object.keys(recipesData);

  return (
    <div>
      <h1>Available Recipes</h1>
      <ul>
        {recipeNames.map(recipeName => (
          <li key={recipeName}>{recipeName}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
