// Import the required modules
const fs = require("fs");
const path = require("path");

// Import recipes.js
const recipes = require("./recipes");

// Import inputs.js
const inputs = require("./inputs");

// Calculate resource requirements for a single recipe
function calculateResourcesForRecipe(
  recipeName,
  desiredRate,
  indent = 0,
  machines
) {
  const recipe = recipes[recipeName];

  if (!recipe) {
    return `Recipe not found for '${recipeName}'.`;
  }

  const machineTime = recipe.machineTime;
  const outputPerSec = recipe.outputs[recipeName] / machineTime;

  const requiredResources = {
    recipeName,
    desiredRate,
  };

  if (recipe.machine) {
    if (!machines[recipe.machine]) {
      machines[recipe.machine] = 0;
    }
    machines[recipe.machine] += Math.ceil(desiredRate / outputPerSec) / 10;
  }

  for (const inputResource in recipe.inputs) {
    if (recipe.inputs.hasOwnProperty(inputResource)) {
      const inputRate = recipe.inputs[inputResource] * desiredRate;
      if (inputResource in recipes) {
        const resourcesForInput = calculateResourcesForRecipe(
          inputResource,
          inputRate,
          indent + 1,
          machines
        );
        requiredResources[inputResource] = resourcesForInput;
      } else {
        requiredResources[inputResource] = inputRate;
      }
    }
  }
  return requiredResources;
}

// Format resources with appropriate indentation
function formatIndentedResources(resources, indent = 0, parentResourceName = null, isMachines = false) {
  let formatted = "";

  for (const resource in resources) {
    if (typeof resources[resource] === "object") {
      let label = resource;

      if (isMachines) {
        label = `${label} (Machines)`;
      } else if (parentResourceName) {
        label = `${label} (${parentResourceName})`;
      }

      formatted += `${"  ".repeat(indent)}${label}:\n${formatIndentedResources(
        resources[resource],
        indent + 1,
        resource,
        resource.endsWith(" Assembler") || resource.endsWith(" Furnace")
      )}\n`;
    } else {
      let label = resource;

      if (parentResourceName) {
        label = `${label} (${parentResourceName})`;
      }

      formatted += `${"  ".repeat(indent)}${label}: ${
        typeof resources[resource] === "number" && resource in machines
          ? `${resources[resource]} (${Math.ceil(resources[resource])})`
          : resources[resource]
      }\n`;
    }
  }

  return formatted;
}

// Usage and log
const logFilePath = path.join(__dirname, "log.txt");
const logContent = [];

const machines = {}; // Define the machines object here

for (const { recipeName, desiredRate } of inputs) {
  if (desiredRate !== 0) {
    const resourcesForRecipe = calculateResourcesForRecipe(
      recipeName,
      desiredRate,
      1,
      machines
    );
    if (resourcesForRecipe) {
      logContent.push(
        `Resource requirements for '${recipeName}' (${desiredRate}):`
      );
      logContent.push(`Output: ${desiredRate}`);
      logContent.push(
        formatIndentedResources(
          { Machines: machines, Resources: resourcesForRecipe },
          1
        )
      );
      logContent.push(""); // Add an empty line after each recipe log
    }
  }
}

fs.writeFileSync(logFilePath, logContent.join("\n"));
console.log(`Log file saved: ${logFilePath}`);
