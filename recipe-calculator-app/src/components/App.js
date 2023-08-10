// App.js
import React from 'react';
import '../styles/styles.css';  // Update the path to styles.css
import RecipeSelector from './RecipeSelector';  // Update the path to RecipeSelector

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RecipeSelector />
      </header>
    </div>
  );
}

export default App;
