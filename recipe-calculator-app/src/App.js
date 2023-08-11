// src/App.js
import React from 'react';
import './styles/App.css';
import RecipeCalculator from './components/RecipeCalculator';

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
