// components/RecipeCalculator.js
import React, { useState } from 'react';
import calculateResources from '../data/calculateResources';
import ResourceTree from './ResourceTree';
import recipesData from '../data/recipesData';

function RecipeCalculator() {
  const [calculatedResources, setCalculatedResources] = useState(null);
  const [desiredAmounts, setDesiredAmounts] = useState({});

  const handleAmountChange = (recipeName, amount) => {
    setDesiredAmounts(prevAmounts => ({ ...prevAmounts, [recipeName]: parseFloat(amount) }));
  };

  const handleCalculate = () => {
    const updatedCalculatedData = {};
    
    // Filter out entries with NaN values (not valid numbers)
    for (const recipeName in desiredAmounts) {
      const amount = parseFloat(desiredAmounts[recipeName]);
      if (!isNaN(amount)) {
        updatedCalculatedData[recipeName] = amount;
      }
    }

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
            value={desiredAmounts[recipeName] || ''}
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