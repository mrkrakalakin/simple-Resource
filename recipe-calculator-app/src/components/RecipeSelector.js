// components/RecipeSelector.js
import React, { useState } from 'react';
import calculateResources from '../data/calculateResources';
import ResourceTree from './ResourceTree';
import recipesData from '../data/recipesData';

function RecipeSelector() {
  const [desiredAmounts, setDesiredAmounts] = useState({});
  const [calculatedResources, setCalculatedResources] = useState(null);

  const handleAmountChange = (recipeName, amount) => {
    setDesiredAmounts(prevAmounts => ({ ...prevAmounts, [recipeName]: parseFloat(amount) }));
  };

  const handleCalculate = () => {
    const resourcesData = calculateResources(desiredAmounts, 1, 0, {});
    setCalculatedResources(resourcesData);
  };

  return (
    <div>
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
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {calculatedResources && <ResourceTree resources={calculatedResources} />}
    </div>
  );
}

export default RecipeSelector;
