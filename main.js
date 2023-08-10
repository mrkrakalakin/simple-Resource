const fs = require('fs');
const path = require('path');

// Import user inputs
const inputs = require('./inputs');

// Import recipes
const recipes = require('./recipes');

// Calculate resource requirements for a single recipe
function calculateResourcesForRecipe(recipeName, desiredRate, calculatedRecipes = {}) {
  if (calculatedRecipes[recipeName]) {
    return calculatedRecipes[recipeName];
  }

  const recipe = recipes[recipeName];

  if (!recipe) {
    return `Recipe not found for '${recipeName}'.`;
  }

  const machineTime = recipe.machineTime;
  const outputPerSec = recipe.outputs[recipeName] / machineTime;

  const requiredResources = {};

  // Recursively calculate input resources and inputs of inputs
  for (const inputResource in recipe.inputs) {
    const inputRate = recipe.inputs[inputResource] * desiredRate;
    if (recipes[inputResource]) {
      const resourcesForInput = calculateResourcesForRecipe(inputResource, inputRate, calculatedRecipes);
      for (const resource in resourcesForInput) {
        requiredResources[resource] = (requiredResources[resource] || 0) + resourcesForInput[resource];
      }
    } else {
      requiredResources[inputResource] = inputRate;
    }
  }

  // Calculate and include number of machines needed (rounded up)
  const machinesNeeded = Math.ceil( desiredRate / outputPerSec);
  requiredResources[recipe.machine] = machinesNeeded / 10;

  // Include the recipe's output as a requirement
  requiredResources[recipeName] = (requiredResources[recipeName] || 0) + desiredRate;

  calculatedRecipes[recipeName] = requiredResources;

  return requiredResources;
}


// Calculate total resource requirements for multiple recipes
function calculateTotalResources(recipeInputs) {
  const totalResources = {};

  for (const { recipeName, desiredRate } of recipeInputs) {
    const resourcesForRecipe = calculateResourcesForRecipe(recipeName, desiredRate);
    if (resourcesForRecipe) {
      for (const resource in resourcesForRecipe) {
        totalResources[resource] = (totalResources[resource] || 0) + resourcesForRecipe[resource];
      }
    }
  }

  return totalResources;
}

// Usage and log
const totalResourcesRequired = calculateTotalResources(inputs);

if (Object.keys(totalResourcesRequired).length > 0) {
  const logFilePath = path.join(__dirname, 'log');
  let logContent = '';

  for (const { recipeName, desiredRate } of inputs) {
    if (desiredRate !== 0) {
      const resourcesForRecipe = calculateResourcesForRecipe(recipeName, desiredRate);
      if (resourcesForRecipe) {
        logContent += `Resource requirements for '${recipeName}' (${desiredRate}): \n${JSON.stringify(resourcesForRecipe, null, 2)}\n\n`;
      }
    }
  }

  fs.writeFileSync(logFilePath, logContent);
  console.log(`Log file saved: ${logFilePath}`);
} else {
  console.log("No valid recipes found.");
}
