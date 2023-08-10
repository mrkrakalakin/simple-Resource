const fs = require('fs');
const path = require('path');

// Import recipes.js
const recipes = require('./recipes');

// Import inputs.js
const inputs = require('./inputs');

// Calculate resource requirements for a single recipe
function calculateResourcesForRecipe(recipeName, desiredRate, indent = 0, machines) {
  const recipe = recipes[recipeName];

  if (!recipe) {
    return `Recipe not found for '${recipeName}'.`;
  }

  const machineTime = recipe.machineTime;
  const outputPerSec = recipe.outputs[recipeName] / machineTime;

  const requiredResources = {};

  if (recipe.machine) {
    if (!machines[recipe.machine]) {
      machines[recipe.machine] = 0;
    }
    machines[recipe.machine] += Math.ceil(desiredRate / outputPerSec) / 10;
  }

  for (const inputResource in recipe.inputs) {
    const inputRate = recipe.inputs[inputResource] * desiredRate;
    if (recipes[inputResource]) {
      const resourcesForInput = calculateResourcesForRecipe(inputResource, inputRate, indent + 1, machines);
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
      // Modify this line to display the machine values in parentheses
      formatted += `${'  '.repeat(indent)}${resource}: ${resources[resource]}${typeof resources[resource] === 'number' && resource in machines ? ` (${Math.ceil(resources[resource])})` : ''}\n`;
    }
  }

  return formatted;
}

// Usage and log
const logFilePath = path.join(__dirname, 'log.txt');
let logContent = '';

const machines = {}; // Define the machines object here

for (const { recipeName, desiredRate } of inputs) {
  if (desiredRate !== 0) {
    const resourcesForRecipe = calculateResourcesForRecipe(recipeName, desiredRate, 1, machines);
    if (resourcesForRecipe) {
      logContent += `Resource requirements for '${recipeName}' (${desiredRate}):\n`;
      logContent += `Output: ${desiredRate}\n`;
      logContent += formatIndentedResources({ Machines: machines, Resources: resourcesForRecipe }, 1);
      logContent += '\n';
    }
  }
}

fs.writeFileSync(logFilePath, logContent);
console.log(`Log file saved: ${logFilePath}`);
