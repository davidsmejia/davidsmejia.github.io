import styles from './Header.module.css';

import React, { Component } from 'react';
import Sprite from '../Sprite/Sprite.js';
import Background from './HeaderBackground.js';

class Header extends Component {

  constructor(props) {
    super(props);
    this.sprite    = this.props.sprite;
    this.content   = this.props.content;
    this.headerRef = React.createRef();
  }

  render() {
    return (
      <header ref={this.headerRef} className={styles.header}>
        <div className={styles.wrap}>
          <Sprite data={this.sprite} scale="15" style={styles.sprite}/>
          <h1 className={styles.name}>{this.content.name}</h1>
          <p className={styles.job}>{this.content.job}</p>
          <p className={styles.location}>{this.content.location}</p>
        </div>
        <Background sizeEl={this.headerRef.current} />
      </header>
    )
  }
}

export default Header;
