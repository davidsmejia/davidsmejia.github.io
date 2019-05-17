import './ContentBlock.css';

import React, { Component } from 'react';

import api from '../../api.json';
import Sprite from '../Sprite/Sprite.js';

class ContentBlock extends Component {

  constructor(props) {
    super(props);
    this.content = this.props.content
  }

  render() {
    return (
      <section className="content-block">
        <Sprite data={api.sprites[this.content.sprite]} scale="6"/>
        <p className="content-block-title">{this.content.title}</p>
        <p className="content-block-blurb">{this.content.blurb}</p>
      </section>
    );
  }
}

export default ContentBlock;
