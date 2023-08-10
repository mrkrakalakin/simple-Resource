// src/components/Buttons.js
import React from 'react';

// CalculateButton component
export function CalculateButton({ onClick }) {
  return (
    <button onClick={onClick}>Calculate</button>
  );
}

// Other button components can be defined here as well

// ... (other button components)

// Export all button components together
const Buttons = {
  CalculateButton,
  // ... (other button components)
};

export default Buttons;
