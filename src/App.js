import React from 'react';
import api from './api.json';
import Header from './components/Header/Header.js';
import Skills from './components/Skills/Skills.js';
import './App.css';

function App() {

  return (
    <div className="App">
      <Header sprite={api.sprites[api.header.sprite]} content={api.header} />
      <Skills skills={api.skills}/>
    </div>
  );
}

export default App;
