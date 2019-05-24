import styles from  './HeaderBackground.module.css';

import React, { Component } from 'react';

class Background extends Component {

  constructor(props) {
    super(props);
    this.time          = 0;
    this.lastTime      = 0;
    this.animationTime = 10000;
    this.canvasRef     = React.createRef();
    this.bubbleCount   = 25;
    this.bubbleSize    = 1;
    this.bubbles       = [];
    this.scroll        = 100;
    this.state         = {
      size: {
        width: 0,
        height: 0,
        top: 0
      }
    };
  }

  easing(t) {
    return 1 + Math.sin(Math.PI *.5 * t - Math.PI * .5 );
  }

  tick(start, end, t) {
    return Math.floor(start + ( (end - start) * this.easing(t) ));
  }

  tickProperty(obj, prop, t) {
    return this.tick(obj[prop], obj[`${prop}_`], t);
  }

  tickArray(obj, prop, t) {
    return obj[prop].map((num, index) => {
      return this.tick(num, obj[`${prop}_`][index], t);
    });
  }

  useLastEndValue(exists, bubble, prop, generator) {
    return exists ? bubble[`${prop}_`] : generator();
  }

  tickBubble(bubble, t) {
    return {
      'x'          : this.tickProperty(bubble, 'x', t),
      'y'          : this.tickProperty(bubble, 'y', t),
      'size'       : this.tickProperty(bubble, 'size', t),
      'line'       : this.tickProperty(bubble, 'line', t),
      'stroke'     : this.tickArray(bubble, 'stroke', t),
      'fill'       : this.tickArray(bubble, 'fill', t),
      'shadow'     : this.tickArray(bubble, 'shadow', t),
      'shadowBlur' : this.tickProperty(bubble, 'shadowBlur', t)
    };
  }

  initBubbles() {

    const exists = this.bubbles.length > 0;
    const animationGenerators  = {
      'x'          : () => this.getRandomInt(0, this.state.size.width),
      'y'          : () => this.getRandomInt(0, this.state.size.height),
      'line'       : () => this.getRandomInt(1, 5),
      'size'       : () => this.getRandomInt(this.state.size.width*.01, this.state.size.width*.15),
      'stroke'     : () => this.getRandHSLAArray(),
      'fill'       : () => this.getRandHSLAArray(),
      'shadow'     : () => this.getRandHSLAArray(),
      'shadowBlur' : () => this.getRandomInt(5, 10)
    };

    for (var i = 0; i < this.bubbleCount; i++)
    {
      if (!exists) this.bubbles.push({});

      for (var key in animationGenerators) {
        if (animationGenerators.hasOwnProperty(key)) {
          this.bubbles[i][key] = this.useLastEndValue(exists, this.bubbles[i], key, animationGenerators[key]);
          this.bubbles[i][`${key}_`] = animationGenerators[key]();
        }
      }
    }
  }

  updateSize() {
    this.setState({size: this.canvasRef.current.parentElement.getBoundingClientRect()});
  }

  getScroll() {
    return Math.abs((this.state.size.top + this.state.size.height) / this.state.size.height);
  }

  //helpers
  getHSLAFromArray(hslArray) {
    return `hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%, .1)`;
  }

  getRandHSLAArray() {
    return [
      this.getRandomInt(0, 360),
      100,
      50
    ];
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //draw

  update(time) {

    const ctx         = this.canvasRef.current.getContext('2d');
    const timeElapsed = time - this.time;
    const t           = timeElapsed/this.animationTime;
    const scroll      = this.getScroll();
    const offset      = Math.floor(this.state.size.height*(.8*scroll));
    const width       = this.state.size.width;
    const height      = this.state.size.height;

    //transform before draw
    ctx.clearRect(0, 0, width, height);

    ctx.translate(0, offset);

    // this.bubbles.forEach((bubble, index) => {
    //
    //   ctx.globalCompositeOperation = index % 2 === 0 ? 'destination-over': 'source-over';
    //
    //   var tickedBubble = this.tickBubble(bubble, t);
    //
    //   if(tickedBubble.size < 0) return;
    //
    //   ctx.lineWidth   = tickedBubble.line;
    //   ctx.strokeStyle = this.getHSLAFromArray(tickedBubble.stroke);
    //   ctx.fillStyle   = this.getHSLAFromArray(tickedBubble.fill);
    //   ctx.shadowColor = this.getHSLAFromArray(tickedBubble.shadow);
    //   ctx.shadowBlur  = tickedBubble.shadowBlur;
    //
    //   ctx.beginPath();
    //
    //   ctx.save();
    //   ctx.translate(tickedBubble.x+tickedBubble.size, tickedBubble.y+tickedBubble.size)
    //   ctx.arc(
    //     0,
    //     0,
    //     Math.floor(tickedBubble.size),
    //     0,
    //     2 * Math.PI
    //   );
    //
    //   ctx.closePath();
    //   ctx.stroke();
    //   ctx.fill();
    //
    //   ctx.restore();
    //
    // });

    ctx.translate(0, -offset);

    if ((this.bubbles.length === 0) || (time - this.time >= this.animationTime)) {
      this.time = time;
      this.initBubbles();
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(width, height);
    ctx.lineTo(width, height-(Math.floor(height*.2*scroll)));
    ctx.closePath();
    ctx.fill();

    this.lastTime = time;
    requestAnimationFrame(this.update.bind(this));
  }

  componentDidMount() {

    this.updateSize();
    window.addEventListener('resize', this.updateSize.bind(this));
    window.addEventListener('scroll', this.updateSize.bind(this));

    requestAnimationFrame(this.update.bind(this));

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize.bind(this));
    window.removeEventListener('scroll', this.updateSize.bind(this));
  }

  render() {
    return <canvas className={styles.background} width={this.state.size.width} height={this.state.size.height} ref={this.canvasRef} />;
  }
}

export default Background;
