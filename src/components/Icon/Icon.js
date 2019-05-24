import styles from './Icon.module.css';

import React, { Component } from 'react';

class Icon extends Component {

  constructor(props) {
    super(props);
    this.name = `${styles[props.name]}`;
    this.style = this.props.style || '';
  }

  render() {
    return (
      <span className={`${this.name} ${this.style}`}></span>
    )
  }
}

export default Icon;
