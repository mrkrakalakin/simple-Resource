// Define recipes
const recipes = {
  "Iron Plate": {
    machine: "Furnace",
    machineTime: 1.25,
    inputs: { "Iron Ore": 1, "Coal": 1 / 6 },
    outputs: { "Iron Plate": 1 },
  },
  "Copper Plate": {
    machine: "Furnace",
    machineTime: 1.25,
    inputs: { "Copper Ore": 1, "Coal": 1 / 6 },
    outputs: { "Copper Plate": 1 },
  },
};

module.exports = recipes;
