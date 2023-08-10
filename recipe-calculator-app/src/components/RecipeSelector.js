import React, { useState } from 'react';
import calculateResourcesForRecipe from '../data/calculateResources';
import TreeVisualization from './ResourceTree';
import recipes from '../data/recipesData';

/**
 * Creates a component for selecting recipes and calculating resources.
 * 
 * The RecipeSelector component allows users to choose recipes and specify desired amounts for each recipe.
 * It then calculates the resources required to produce those amounts of recipes and displays the results.
 *
 * @param {function} setCalculatedData - A function to set the calculated data for resources.
 */
function RecipeSelector({ setCalculatedData }) {
  // Store the desired amounts for each recipe
  const [desiredAmounts, setDesiredAmounts] = useState({});
  // Flag to control whether to show the tree visualization
  const [showTree, setShowTree] = useState(false);

  /**
   * Handles the change in the desired amount for a recipe.
   *
   * @param {string} recipeName - The name of the recipe.
   * @param {number} amount - The desired amount.
   */
  const handleAmountChange = (recipeName, amount) => {
    setDesiredAmounts(prevAmounts => ({ ...prevAmounts, [recipeName]: amount }));
  };

  /**
   * Handles the calculation of resources based on the desired amounts of recipes.
   */
  const handleCalculate = () => {
    // Object to store the input machines
    const inputMachines = {};
    // Object to store the updated calculated data
    const updatedCalculatedData = {};

    // Iterate through the desired amounts for each recipe
    for (const recipeName in desiredAmounts) {
      const amount = parseFloat(desiredAmounts[recipeName]);
      // Check if the amount is a valid number
      if (!isNaN(amount)) {
        // Store the valid amount in the updated calculated data
        updatedCalculatedData[recipeName] = amount;
      }
    }

    // Calculate the resources required based on the updated calculated data
    const resourcesData = calculateResourcesForRecipe(updatedCalculatedData, 1, 0, inputMachines);
    // Set the calculated data using the provided function
    setCalculatedData(resourcesData);
    // Show the tree visualization
    setShowTree(true);
  };

  return (
    <div>
      {/* Render input fields for each recipe */}
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
      {/* Button to trigger the calculation */}
      <button onClick={handleCalculate}>Calculate</button>
      {/* Render the tree visualization if showTree is true */}
      {showTree && <TreeVisualization data={setCalculatedData} />}
    </div>
  );
}

export default RecipeSelector;
