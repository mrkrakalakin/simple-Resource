import React, { useState } from 'react';
import RecipeSelector from './RecipeSelector';
import TreeVisualization from './TreeVisualization';
import './styles.css';

function App() {
  const [calculatedData, setCalculatedData] = useState(null); // State to store calculated data

  return (
    <div className="App">
      <header className="App-header">
        <RecipeSelector setCalculatedData={setCalculatedData} /> {/* Pass setCalculatedData as prop */}
        {calculatedData && <TreeVisualization data={calculatedData} />} {/* Render TreeVisualization component with calculated data */}
      </header>
    </div>
  );
}

export default App;
