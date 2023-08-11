// src/components/RecipeCalculator.js
import React, { useState } from 'react';
import RecipeList from './RecipeList';
import Buttons from './Buttons';

function RecipeCalculator() {
  const [calculateResources, setCalculatedResources] = useState(null);
  const [desiredAmounts, setDesiredAmounts] = useState({});

  const handleAmountChange = (recipeName, amount) => {
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
      <RecipeList
        desiredAmounts={desiredAmounts}
        handleAmountChange={handleAmountChange}
      />
      <Buttons.CalculateButton onClick={handleCalculate} />
    </div>
  );
}

export default RecipeCalculator;
