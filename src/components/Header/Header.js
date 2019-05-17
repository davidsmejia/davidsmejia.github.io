import './Header.css';

import React, { Component } from 'react';
import Sprite from '../Sprite/Sprite.js';

class Header extends Component {

  constructor(props) {
    super(props);
    this.sprite = this.props.sprite;
    this.content = this.props.content;
  }

  render() {
    return (
      <header className="App-header">
        <Sprite data={this.sprite} scale="13"/>
        <h1>{this.content.name}</h1>
        <p className="job">{this.content.job}</p>
        <p className="location">{this.content.location}</p>
        <p className="blurb">{this.content.blurb}</p>
      </header>
    )
  }
}

export default Header;
