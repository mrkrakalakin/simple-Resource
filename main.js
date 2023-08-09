const fs = require('fs');
const path = require('path');

// Import user inputs
const inputs = require('./input');

// Extract desiredRate and recipeName from inputs
const { desiredRate, recipeName } = inputs;

// Import recipes
const recipes = require('./recipes');

// ... (rest of your code remains the same)

// Calculate resource requirements for each recipe
function calculateResources(recipeName, desiredRate) {
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

// Usage and log
if (recipes[recipeName]) {
  const resourcesRequired = calculateResources(recipeName, desiredRate);
  if (resourcesRequired) {
    const logFilePath = path.join(__dirname, 'log');
    const logContent = `Resources required for ${desiredRate} ${recipeName} per 10 seconds:\n${JSON.stringify(resourcesRequired, null, 2)}\n`;
    fs.writeFileSync(logFilePath, logContent);
    console.log(`Log file saved: ${logFilePath}`);
  }
} else {
  console.log(`Recipe '${recipeName}' not found.`);
}
