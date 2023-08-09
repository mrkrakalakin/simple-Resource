// main.js

// User Inputs
const desiredRate = 6; // Desired production rate per second
const recipeName = "Iron Plate"; // Specify "Iron Plate" for calculation

// Import recipes and machines
const recipes = require('./recipes');
const machines = require('./machines');

// Calculate resource requirements for a specific recipe
function calculateResources(recipe, desiredRate) {
  const machine = machines[recipe.machine];

  console.log("Recipe:", recipe);
  console.log("Machine:", machine);

  if (!machine) {
    console.log(`Machine '${recipe.machine}' not found.`);
    return;
  }

  if (!machine.time || !recipe.outputs["Iron Plate"]) {
    console.log(`Invalid machine or recipe data.`);
    return;
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
    console.log(`Resources required for ${desiredRate} ${recipeName} per second:`);
    console.log(resourcesRequired);
  }
} else {
  console.log(`Recipe '${recipeName}' not found.`);
}
