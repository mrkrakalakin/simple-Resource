const fs = require('fs');
const path = require('path');

// Import recipes.js
const recipes = require('./recipes');

// Import inputs.js
const inputs = require('./inputs');

// Calculate resource requirements for a single recipe
function calculateResourcesForRecipe(recipeName, desiredRate, indent = 0) {
  // Converts recipes to objects
  const recipe = recipes[recipeName];
  // If the input recipe is not found, print this error
  if (!recipe) {
    return `Recipe not found for '${recipeName}'.`;
  }
  // Get's machineTime from recipe
  const machineTime = recipe.machineTime;
  // Convert machineTime to avg. output per second based on amount
  const outputPerSec = recipe.outputs[recipeName] / machineTime;

  const requiredResources = {};

  // Calculate and include number of machines needed (rounded up)
  const machinesNeeded = Math.ceil(desiredRate / outputPerSec);
  requiredResources[recipe.machine] = machinesNeeded / 10;

  // Include the recipe's output as a requirement
  requiredResources[recipeName] = desiredRate;

  // Recursively calculate input resources and inputs of inputs
  for (const inputResource in recipe.inputs) {
    const inputRate = recipe.inputs[inputResource] * desiredRate;
    if (recipes[inputResource]) {
      const resourcesForInput = calculateResourcesForRecipe(inputResource, inputRate, indent + 1);
      requiredResources[inputResource] = resourcesForInput;
    } else {
      requiredResources[inputResource] = inputRate;
    }
  }

  return requiredResources;
}

// Format resources with appropriate indentation
function formatIndentedResources(resources, indent = 0, isMachines = false) {
  let formatted = '';

  if (isMachines) {
    formatted += `${'  '.repeat(indent)}Machines:\n`;
    indent += 1;
  }

  for (const resource in resources) {
    if (typeof resources[resource] === 'object') {
      if (resource.endsWith(' Furnace') || resource.endsWith(' Assembler')) {
        formatted += formatIndentedResources(resources[resource], indent, true);
      } else {
        formatted += `${'  '.repeat(indent)}${resource}:\n`;
        formatted += formatIndentedResources(resources[resource], indent + 1);
      }
    } else {
      formatted += `${'  '.repeat(indent)}${resource}: ${resources[resource]}\n`;
    }
  }

  return formatted;
}


// Usage and log
const logFilePath = path.join(__dirname, 'log.txt');
let logContent = '';

for (const { recipeName, desiredRate } of inputs) {
  if (desiredRate !== 0) {
    const resourcesForRecipe = calculateResourcesForRecipe(recipeName, desiredRate);
    if (resourcesForRecipe) {
      logContent += `Resource requirements for '${recipeName}' (${desiredRate}):\n`;
      logContent += `Output: ${desiredRate}\n`;
      logContent += formatIndentedResources(resourcesForRecipe, 1);
      logContent += '\n';
    }
  }
}

fs.writeFileSync(logFilePath, logContent);
console.log(`Log file saved: ${logFilePath}`);
