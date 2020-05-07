import {
  Component, createRef, h,
} from 'preact';
import * as classnames from 'classnames';
import * as s from './BackgroundMedia.css';

interface AnimatedGradientProps {
}

export interface AnimatedGradientState {
  loaded: boolean;
}

class Pixel {
  private readonly x: number;

  private readonly y: number;

  private hue: number;

  private readonly velocity: number;

  constructor(
    x: number,
    y: number,
  ) {
    this.x = x;
    this.y = y;
    this.hue = Math.floor(Math.random() * 360);

    const direction = Math.random() > 0.5 ? -1 : 1;
    this.velocity = (Math.random() + 15) * 0.01 * direction;
  }

  update = () => {
    this.hue += this.velocity;
  };

  render = (ctx: CanvasRenderingContext2D) => {
    const hue = Math.round(this.hue);

    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillRect(this.x, this.y, 1, 1);
  };
}

const animateCanvasGradient = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d');

  const pixels = [
    new Pixel(0, 0),
    new Pixel(1, 0),
    new Pixel(0, 1),
    new Pixel(1, 1),
  ];

  const animate = () => {
    pixels.forEach((pixel) => {
      pixel.update();
      pixel.render(ctx);
    });

    requestAnimationFrame(animate);
  };

  animate();
};

export default class AnimatedGradient extends Component<AnimatedGradientProps, AnimatedGradientState> {
  canvasElement = createRef();

  state = {
    loaded: false,
  };

  componentDidMount(): void {
    animateCanvasGradient(this.canvasElement.current);

    this.showBackground();
  }

  private showBackground(): void {
    this.setState({
      loaded: true,
    });
  }

  render(props: AnimatedGradientProps, state: AnimatedGradientState) {
    const classes = state.loaded === true
      ? classnames(s.backgroundMedia, s.loaded)
      : s.backgroundMedia;

    return (
      <div className={s.backgroundMediaContainer}>
        <canvas ref={this.canvasElement} className={classes} width="2" height="2" />
      </div>
    );
  }
}
