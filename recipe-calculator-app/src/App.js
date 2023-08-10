import React from 'react';
import RecipeSelector from './RecipeSelector';
import TreeVisualization from './TreeVisualization';
import './styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RecipeSelector />
        <TreeVisualization data={{ /* Your data here */ }} />
      </header>
    </div>
  );
}

export default App;
