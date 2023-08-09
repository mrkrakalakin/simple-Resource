const fs = require('fs');
const path = require('path');

// User Inputs
const givenRate = 32; // Desired production rate per second
const recipeName = "Iron Plate"; // Specify recipe for calculation
const desiredRate = givenRate / 10;

// Import recipes
const recipes = require('./recipes');

// Calculate resource requirements for each recipe
function calculateResources(recipeName, desiredRate) {
  const recipe = recipes[recipeName];

  if (!recipe) {
    return `Recipe not found for '${recipeName}'.`;
  }

  const machineTime = recipe.machineTime; // Get the machine time from the recipe
  const timePerOutput = recipe.outputs[recipeName] / machineTime;

  const requiredResources = {};

  // Calculate input resources
  for (const inputResource in recipe.inputs) {
    const inputRate = recipe.inputs[inputResource] * desiredRate;
    requiredResources[inputResource] = inputRate * timePerOutput;
  }

  // Calculate and include number of machines needed (rounded up)
  const machinesNeeded = Math.ceil(desiredRate * timePerOutput);
  requiredResources[recipe.machine] = machinesNeeded;

  return requiredResources;
}

// Usage
if (recipes[recipeName]) {
  const resourcesRequired = calculateResources(recipeName, desiredRate);
  if (resourcesRequired) {
    const logFilePath = path.join(__dirname, 'log');
    const logContent = `Resources required for ${givenRate} ${recipeName} per 10 seconds:\n${JSON.stringify(resourcesRequired, null, 2)}\n`;
    fs.writeFileSync(logFilePath, logContent);
    console.log(`Log file saved: ${logFilePath}`);
  }
} else {
  console.log(`Recipe '${recipeName}' not found.`);
}
