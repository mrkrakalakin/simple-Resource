// components/RecipeCalculator.js
import React, { useState } from 'react';
import calculateResources from '../data/calculateResources';
import ResourceTree from './ResourceTree';
import recipesData from '../data/recipesData';

function RecipeCalculator() {
  const [calculatedResources, setCalculatedResources] = useState(null);
  const [desiredAmounts, setDesiredAmounts] = useState({});

  const handleAmountChange = (recipeName, amount) => {
    // Format the recipeName to match keys in recipesData
    const formattedRecipeName = recipeName.toLowerCase();
    setDesiredAmounts(prevAmounts => ({ ...prevAmounts, [formattedRecipeName]: parseFloat(amount) }));
  };

  const handleCalculate = () => {
    const updatedCalculatedData = { ...desiredAmounts };
    
    const resourcesData = calculateResources(updatedCalculatedData, 1, 0, {});
    setCalculatedResources(resourcesData);
  };

  return (
    <div>
      {Object.keys(recipesData).map(recipeName => (
        <div key={recipeName}>
          <label htmlFor={recipeName}>{recipeName}:</label>
          <input
            type="number"
            id={recipeName}
            value={desiredAmounts[recipeName.toLowerCase()] || ''}
            onChange={e => handleAmountChange(recipeName, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleCalculate}>Calculate</button>
      {calculatedResources && <ResourceTree resources={calculatedResources} />}
    </div>
  );
}

export default RecipeCalculator;
