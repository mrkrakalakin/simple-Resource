import React, { useState } from 'react';
import recipes from './recipes';
// Make sure you have this import statement in RecipeSelector.js
import TreeVisualization from './TreeVisualization';


function RecipeSelector() {
  const [desiredAmounts, setDesiredAmounts] = useState({});
  const [showTree, setShowTree] = useState(false); // State to control TreeVisualization visibility

  const handleAmountChange = (recipeName, amount) => {
    setDesiredAmounts(prevAmounts => ({ ...prevAmounts, [recipeName]: amount }));
  };

  const handleCalculate = () => {
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
      {showTree && <TreeVisualization data={{ /* Your data here */ }} />}
    </div>
  );
}

export default RecipeSelector;
