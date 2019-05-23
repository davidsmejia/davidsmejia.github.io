import React from 'react';
import api from './api.json';
import Header from './components/Header/Header.js';

import './App.css';

function App() {

  return (
    <div className="App">
      <Header sprite={api.sprites[api.header.sprite]} content={api.header} />
    </div>
  );
}

export default App;
