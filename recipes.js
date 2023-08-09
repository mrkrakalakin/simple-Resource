// Define recipes
const recipes = {
  "Iron Plate": {
    machine: "Iron Furnace",
    machineTime: 1.25,
    inputs: { "Iron Ore": 1, "Coal": 1 / 6 },
    outputs: { "Iron Plate": 1 },
  },
  "Copper Plate": {
    machine: "Copper Furnace",
    machineTime: 1.25,
    inputs: { "Copper Ore": 1, "Coal": 1 / 6 },
    outputs: { "Copper Plate": 1 },
  },
  "Aluminium Plate": {
    machine: "Aluminium Furnace",
    machineTime: 1.53,
    inputs: { "Bauxite Ore": 1, "Coal": 1 / 6 },
    outputs: { "Aluminium Plate": 1 },
  },
};

module.exports = recipes;
