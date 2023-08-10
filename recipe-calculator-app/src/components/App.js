// components/App.js
import React from 'react';
import RecipeCalculator from './RecipeCalculator';
import '../styles/styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RecipeCalculator />
      </header>
    </div>
  );
}

export default App;
