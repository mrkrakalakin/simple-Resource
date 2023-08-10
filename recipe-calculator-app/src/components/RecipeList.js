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
              className="small-input"
              type="number"
              value={desiredAmounts[recipeName] || ""}
              onChange={(e) => handleAmountChange(recipeName, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
