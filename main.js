const fs = require('fs');
const path = require('path');

// Import user inputs
const inputs = require('./inputs');

// Import recipes
const recipes = require('./recipes');

// Calculate resource requirements for a single recipe
function calculateResourcesForRecipe(recipeName, desiredRate) {
  const recipe = recipes[recipeName];

  if (!recipe) {
    return `Recipe not found for '${recipeName}'.`;
  }

  const machineTime = recipe.machineTime;
  const outputPerSec = recipe.outputs[recipeName] / machineTime;

  const requiredResources = {};

  // Calculate input resources
  for (const inputResource in recipe.inputs) {
    const inputRate = recipe.inputs[inputResource] * desiredRate;
    requiredResources[inputResource] = inputRate;
  }

  // Calculate and include number of machines needed (rounded up)
  const machinesNeeded = Math.ceil((desiredRate / 10) / outputPerSec);
  requiredResources[recipe.machine] = machinesNeeded;

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
  const logContent = `Total Resources required for desired rates:\n${JSON.stringify(totalResourcesRequired, null, 2)}\n`;
  fs.writeFileSync(logFilePath, logContent);
  console.log(`Log file saved: ${logFilePath}`);
} else {
  console.log("No valid recipes found.");
}