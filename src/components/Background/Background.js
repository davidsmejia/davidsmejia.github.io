import './Background.css';

import React, { Component } from 'react';

class Background extends Component {

  constructor(props) {
    super(props);

    this.size = 1500;

    this.canvasRef = React.createRef();
    this.scrollTop = this.getScrollPercent();
    this.bubbles   = [];
    this.drawAlpha = 1;
    this.fadeAlpha = 1;
    this.image     = null;

    for (var i = 0; i < 10; i++) {
      this.bubbles.push({
        x: 500*Math.random(),
        y: this.size,
        size: 1,
        derivation: this.getRandomInt(50, 200),
        speed: this.getRandomInt(0, 20),
        color: this.getRandColor()
      });
    }
  }

  //scrolling

  onScroll() {
    this.scrollTop = this.getScrollPercent();
    this.drawAlpha = 1;
    this.fadeAlpha = 1;
  }

  getScrollPercent() {
    return 100*Math.abs(document.body.getBoundingClientRect().top)/(document.body.clientHeight-window.innerHeight);
  }

  //helpers

  getRandColor() {
    return "#"+((1<<24)*Math.random()|0).toString(16);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //draw

  update() {

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    let scrollPercent = this.getScrollPercent();

    if (this.drawAlpha > 0) {

      this.drawAlpha = Math.max(0, this.drawAlpha - .1);

      ctx.globalAlpha = .4*this.drawAlpha;

      ctx.globalCompositeOperation='destination-over';

      this.bubbles.forEach((bubble) => {

        // update bubble values
        bubble.x = Math.min(this.size, Math.max(0, this.getRandomInt(bubble.x-bubble.derivation, bubble.x+bubble.derivation)));
        bubble.y = (bubble.y+bubble.speed) > this.size ? 0: bubble.y+bubble.speed;
        bubble.size = Math.max(10, Math.min(2*(100 - scrollPercent), this.size));


        ctx.beginPath();

        ctx.strokeStyle = this.getRandColor();
        ctx.fillStyle = this.getRandColor();
        ctx.lineWidth = .5;
        ctx.shadowBlur = scrollPercent;
        ctx.shadowColor= bubble.color;
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
      });

      ctx.globalCompositeOperation='source-over';

    } else if (this.fadeAlpha > 0) {

      this.fadeAlpha = Math.max(0, this.fadeAlpha - .005);
      ctx.globalAlpha=this.fadeAlpha;
      ctx.globalCompositeOperation='copy';
      ctx.drawImage(canvas,0,0,this.size,this.size,0,0,this.size,this.size);
      ctx.globalAlpha=1.00;
      ctx.globalCompositeOperation='source-over';
    }

    // clear out if nothing there is this cheap enough?
    if (this.fadeAlpha === 0) ctx.clearRect(0, 0, this.size, this.size);

    requestAnimationFrame(this.update.bind(this));

  }

  componentDidMount() {

    window.addEventListener('scroll', this.onScroll.bind(this));

    requestAnimationFrame(this.update.bind(this));

  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  render() {
    return <canvas className="background" width={this.size} height={this.size} ref={this.canvasRef} />;
  }
}

export default Background;
