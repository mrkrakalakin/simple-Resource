import React, { useState } from 'react';
import recipes from './recipes';
import calculateResourcesForRecipe from './calculateRecipes'; // Import the calculateResourcesForRecipe function

function RecipeSelector({ setCalculatedData }) {
  const [desiredAmounts, setDesiredAmounts] = useState({});

  const handleAmountChange = (recipeName, amount) => {
    setDesiredAmounts(prevAmounts => ({ ...prevAmounts, [recipeName]: amount }));
  };

  const handleCalculate = () => {
    // Call the function that calculates the resources and sets the calculated data
    const calculatedData = calculateResourcesForRecipe(desiredAmounts);
    setCalculatedData(calculatedData);
  };

  return (
    <div>
      {Object.keys(recipes).map(recipeName => (
        <div key={recipeName}>
          <label htmlFor={recipeName}>{recipeName}:</label>
          <input
            type="number"
            id={recipeName}
            value={desiredAmounts[recipeName] || ''}
            onChange={e => handleAmountChange(recipeName, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleCalculate}>Calculate</button>
    </div>
  );
}

export default RecipeSelector;
