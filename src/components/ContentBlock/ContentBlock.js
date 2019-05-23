import styles from './ContentBlock.module.css';

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
      <section className={styles.block}>
        <h6 className={styles.title}>{this.content.title}</h6>
        <p className={styles.blurb}>{this.content.blurb}</p>
      </section>
    );
  }
}

export default ContentBlock;
