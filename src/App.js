import React from 'react';
import api from './api.json';
import Header from './components/Header/Header.js';
import ContentBlock from './components/ContentBlock/ContentBlock.js';
import Background from './components/Background/Background.js';
import './App.css';

function App() {

  const content = api.content.map((contentItem, key) =>
    <ContentBlock key={key} content={contentItem}/>
  );

  return (
    <div className="App">
      <div className="App-wrap">
        <Header sprite={api.sprites[api.header.sprite]} content={api.header} />
        {content}
      </div>
      <div className="App-background">
        <Background />
      </div>
    </div>
  );
}

export default App;
