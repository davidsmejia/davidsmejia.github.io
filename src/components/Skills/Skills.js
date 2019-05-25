import styles from './Skills.module.css';

import React, { Component } from 'react';
import Icon from '../Icon/Icon.js';

class Skills extends Component {

  constructor(props) {
    super(props);
    this.skills = props.skills;
  }

  createLevel(skill) {
    return [...Array(parseInt(skill.level)).keys()].map((index) => {
      return (
        <span key={index} className={styles["level-indicator"]}></span>
      )
    });
  }

  createSkills() {
    return this.skills.map((skill, index) => {
      const level = this.createLevel(skill);
      return (
        <div key={index} className={styles.skill}>
          <Icon style={styles['skill-icon']} svg={skill.svg}/>
          <p className={styles['skill-name']}>{skill.name}</p>
          <div className={styles['skill-level']}>
            { level }
          </div>
        </div>
      )
    })
  }

  render() {
    const skills = this.createSkills();
    return (
      <section className={styles.skills}>
        <h2 className={styles["skills-title"]}>Skills &amp; Experience</h2>
        <div className={styles["skills-list"]}>
          { skills }
        </div>
      </section>
    )
  }
}

export default Skills;
