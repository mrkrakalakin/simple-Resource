// Define recipes
const recipes = {
  "Iron Plate": {
    machine: "Iron Furnace",
    machineTime: 0.8,
    inputs: { "Iron Ore": 1, "Coal": 1 / 6 },
    outputs: { "Iron Plate": 1 },
  },
};

module.exports = recipes;
