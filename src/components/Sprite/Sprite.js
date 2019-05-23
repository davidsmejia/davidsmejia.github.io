import React, { Component } from 'react';

class Sprite extends Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.scale = parseFloat(props.scale) || 1;
    this.scaledWidth = this.scale*this.props.data.width;
    this.scaledHeight = this.scale*this.props.data.height;
    this.style = this.props.style || '';
  }

  draw() {
    const { width, background, pixels } = this.props.data;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.clearRect(0, 0, this.scaledWidth, this.scaledHeight);

    if (background) {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, this.scaledWidth, this.scaledHeight);
    }


    //draw pixels
    for (var i = 0; i < pixels.length; i++) {
      if (pixels[i] == null) continue;
      ctx.beginPath();
      ctx.fillStyle = pixels[i];
      ctx.fillRect(this.scale*(i%width), this.scale*Math.floor(i/width), this.scale, this.scale);
    }

    // ctx.restore();
  }

  componentDidMount() {

    this.draw();
  }

  componentDidUpdate() {
  }

  render() {
    return <canvas className={this.style} width={this.scaledWidth} height={this.scaledHeight} ref={this.canvasRef} />;
  }
}

export default Sprite;
