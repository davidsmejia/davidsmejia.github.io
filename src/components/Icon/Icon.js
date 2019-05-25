// import styles from './Icon.module.css';

import React, { Component } from 'react';

class Icon extends Component {

  constructor(props) {
    super(props);
    this.style = props.style || '';
    this.svg = props.svg || '';
  }

  inlineSvg() {
    return {__html: this.svg};
  }

  render() {
    return (
      <span className={`${this.style}`} dangerouslySetInnerHTML={this.inlineSvg()}></span>
    )
  }
}

export default Icon;
