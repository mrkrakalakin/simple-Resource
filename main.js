const fs = require('fs');
const path = require('path');

// User Inputs
const givenRate = 56; // Desired production rate per second
const recipeName = "Iron Plate"; // Specify "Iron Plate" for calculation
const desiredRate = givenRate/10

// Import recipes and machines
const recipes = require('./recipes');
const machines = require('./machines');

// Calculate resource requirements for a specific recipe
function calculateResources(recipeName, desiredRate) {
  const recipe = recipes[recipeName];
  const machine = machines[recipe.machine];

  if (!recipe || !machine) {
    return `Recipe or machine not found for '${recipeName}'.`;
  }

  const timePerOutput = machine.time / recipe.outputs[recipeName];

  const requiredResources = {};

  // Calculate input resources
  for (const inputResource in recipe.inputs) {
    const inputRate = recipe.inputs[inputResource] * desiredRate;
    requiredResources[inputResource] = inputRate * timePerOutput;
  }

  // Add machine requirements
  requiredResources[recipe.machine] = Math.ceil(desiredRate * timePerOutput);

  return requiredResources;
}

// Example usage
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
