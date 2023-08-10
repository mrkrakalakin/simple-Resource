// src/components/RecipeList.js
import React, { useState } from "react";
import recipesData from "../data/recipesData";

function RecipeList() {
  const [desiredAmounts, setDesiredAmounts] = useState({});
  const recipeNames = Object.keys(recipesData);

  const handleAmountChange = (recipeName, amount) => {
    setDesiredAmounts((prevAmounts) => ({
      ...prevAmounts,
      [recipeName]: parseFloat(amount),
    }));
  };

  return (
    <div>
      <h1>Available Recipes</h1>
      <ul>
        {recipeNames.map((recipeName) => (
          <li key={recipeName}>
            {recipeName}:
            <input
              type="text"
              value={desiredAmounts[recipeName] || ""}
              onChange={(e) => handleAmountChange(recipeName, e.target.value)}
              className="small-input"
              inputMode="numeric"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
