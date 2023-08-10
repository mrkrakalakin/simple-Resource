// Define recipes
const recipes = {
  "Iron Plate": {
    machine: "Iron Furnace",
    machineTime: 1.25,
    inputs: { "Iron Ore": 1, Coal: 1 / 6 },
    outputs: { "Iron Plate": 1 },
  },
  "Copper Plate": {
    machine: "Copper Furnace",
    machineTime: 1.25,
    inputs: { "Copper Ore": 1, Coal: 1 / 6 },
    outputs: { "Copper Plate": 1 },
  },
  "Aluminium Plate": {
    machine: "Aluminium Furnace",
    machineTime: 1.53,
    inputs: { "Bauxite Ore": 1, Coal: 1 / 6 },
    outputs: { "Aluminium Plate": 1 },
  },
  "Silicone Plate": {
    machine: "Silicone Chem Plant",
    machineTime: 1.53,
    inputs: { Gravel: 3, Coal: 1 },
    outputs: { "Silicone Plate": 1 },
  },
  "Silver Bar": {
    machine: "Silver Furnace",
    machineTime: 1.53,
    inputs: { "Silver Ore": 3 },
    outputs: { "Silver Bar": 1 },
  },
  "Plastic Bar": {
    machine: "Plastic Chem Plant",
    machineTime: 4.16,
    inputs: { Coal: 1, "Oil Barrel": 1 },
    outputs: { "Plastic Bar": 1 },
  },
  "Iron Gear": {
    machine: "Iron Gear Assembler",
    machineTime: 1.25,
    inputs: { "Iron Plate": 1 },
    outputs: { "Iron Gear": 1 },
  },
  "Iron Pipe": {
    machine: "Iron Pipe Assembler",
    machineTime: 1.25,
    inputs: { "Iron Plate": 1 },
    outputs: { "Iron Pipe": 1 },
  },
  "Iron Frame": {
    machine: "Iron Frame Assembler",
    machineTime: 1.25,
    inputs: { "Iron Plate": 1, "Iron Pipe": 1 },
    outputs: { "Iron Frame": 1 },
  },
  Motor: {
    machine: "Motor Assembler",
    machineTime: 1.25,
    inputs: { "Iron Gear": 1, Rotor: 1, "Green Wire": 1, "Iron Frame": 1 },
    outputs: { Motor: 1 },
  },
  "Titanium Plate": {
    machine: "Titanium Furnace",
    machineTime: 1.25,
    inputs: { "Titanium Ore": 2 },
    outputs: { "Titanium Plate": 1 },
  },
  "Turbine Fan": {
    machine: "TFan Assembler",
    machineTime: 1.25,
    inputs: { "Titanium Plate": 1, "Iron Gear": 1 },
    outputs: { "Turbine Fan": 1 },
  },
  Turbine: {
    machine: "Turbine Assembler",
    machineTime: 1.25,
    inputs: {
      "Turbine Fan": 1,
      Motor: 1,
      "Steel Plate": 2,
      "Super Connector": 1,
    },
    outputs: { Turbine: 1 },
  },
};

module.exports = recipes;
