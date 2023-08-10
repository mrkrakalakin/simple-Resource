// src/App.js
import React from 'react';
import '../styles/App.css';
import '../styles/styles.css';
import RecipeList from '../components/RecipeList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RecipeList />
      </header>
    </div>
  );
}

export default App;