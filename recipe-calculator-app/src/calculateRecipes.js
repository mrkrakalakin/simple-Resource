// calculateRecipes.js

// Import the recipes.js file
const recipes = require("./recipes");

// Calculate resource requirements for a single recipe
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

  const requiredResources = {
    recipeName,
    desiredRate,
  };

  if (recipe.machine) {
    if (!machines[recipe.machine]) {
      machines[recipe.machine] = 0;
    }
    machines[recipe.machine] += Math.ceil(desiredRate) / 10;
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

module.exports = calculateResourcesForRecipe;
