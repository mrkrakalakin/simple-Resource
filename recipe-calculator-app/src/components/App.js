import React, { useState } from 'react';
import RecipeSelector from './RecipeSelector';
import TreeVisualization from './TreeVisualization';
import '../styles/styles.css';

function App() {
  const [calculatedData, setCalculatedData] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <RecipeSelector setCalculatedData={setCalculatedData} />
        {calculatedData && <TreeVisualization data={calculatedData} />}
      </header>
    </div>
  );
}

export default App;
