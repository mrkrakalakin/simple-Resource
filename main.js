const fs = require('fs');
const path = require('path');

// User Inputs
const desiredRate = 6; // Desired production rate per second
const recipeName = "Iron Plate"; // Specify "Iron Plate" for calculation

// Import recipes and machines
const recipes = require('./recipes');
const machines = require('./machines');

// Calculate resource requirements for a specific recipe
function calculateResources(recipe, desiredRate) {
  const machine = machines[recipe.machine];

  if (!machine) {
    return `Machine '${recipe.machine}' not found.`;
  }

  if (!machine.time || !recipe.outputs["Iron Plate"]) {
    return "Invalid machine or recipe data.";
  }

  const timePerOutput = machine.time / recipe.outputs["Iron Plate"];

  const requiredResources = {};

  // Calculate input resources
  for (const inputResource in machine.inputs) {
    const inputRate = recipe.inputs[inputResource] * desiredRate;
    requiredResources[inputResource] = inputRate * timePerOutput;
  }

  return requiredResources;
}

// Example usage
if (recipes[recipeName]) {
  const resourcesRequired = calculateResources(recipes[recipeName], desiredRate);
  if (resourcesRequired) {
    const logFilePath = path.join(__dirname, 'log');
    
    const logContent = `Resources required for ${desiredRate} ${recipeName} per second:\n${JSON.stringify(resourcesRequired, null, 2)}\n`;
    
    fs.writeFileSync(logFilePath, logContent);
    console.log(`Log file saved: ${logFilePath}`);
  }
} else {
  console.log(`Recipe '${recipeName}' not found.`);
}
