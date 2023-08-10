import React, { useState } from 'react';
import calculateResourcesForRecipe from '../data/calculateResources';
import TreeVisualization from './ResourceTree';
import recipes from '../data/recipesData';

function RecipeSelector({ setCalculatedData }) {
  const [desiredAmounts, setDesiredAmounts] = useState({});
  const [showTree, setShowTree] = useState(false);

  const handleAmountChange = (recipeName, amount) => {
    setDesiredAmounts(prevAmounts => ({ ...prevAmounts, [recipeName]: amount }));
  };

  const handleCalculate = () => {
    const inputMachines = {};
    const updatedCalculatedData = {};

    for (const recipeName in desiredAmounts) {
      const amount = parseFloat(desiredAmounts[recipeName]);
      if (!isNaN(amount)) {
        updatedCalculatedData[recipeName] = amount;
      }
    }

    const resourcesData = calculateResourcesForRecipe(updatedCalculatedData, 1, 0, inputMachines);
    setCalculatedData(resourcesData);
    setShowTree(true);
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
      {showTree && <TreeVisualization data={setCalculatedData} />}
    </div>
  );
}

export default RecipeSelector;
