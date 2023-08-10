import React, { useState } from 'react';
import calculateResourcesForRecipe from './calculateRecipes';

function RecipeCalculator() {
  const [recipeName, setRecipeName] = useState('');
  const [desiredRate, setDesiredRate] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const resourcesForRecipe = calculateResourcesForRecipe(
      recipeName,
      parseInt(desiredRate)
    );
    setResult(resourcesForRecipe);
  };

  return (
    <div>
      <h1>Recipe Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Recipe Name:
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Desired Rate:
          <input
            type="number"
            value={desiredRate}
            onChange={(e) => setDesiredRate(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Calculate</button>
      </form>
      <div>
        {result && (
          <pre>
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

export default RecipeCalculator;
