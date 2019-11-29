import FontText from './Render/fonttext';
import FontStyle from './Render/fontstyle';

export class GameScreen {
  canvasId: string;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  fps: string;
  lastRender: number;
  defaultFont: FontStyle;

  constructor(
    canvasId: string,
    defaultFont: FontStyle = new FontStyle("", "32px", "serif")
  ) {
    this.canvasId = canvasId;
    this.defaultFont = defaultFont;
    this.buildCanvasContext();
  }

  buildCanvasContext() {
    this.canvas = <HTMLCanvasElement>document.getElementById(this.canvasId);
    this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");
  }

  calculateFps(time: number): number {
    let delta = (time - this.lastRender) / 1000;
    this.lastRender = time;
    return Math.round(1 / delta);
  }

  drawFps(time: number) {
    this.drawText(
      new FontText(
        this.calculateFps(time) + " FPS",
        new FontStyle("32px", "Fira Code")
      )
    );
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawText(text: FontText) {
    if (text.getStyle()) {
      this.context.font = text.getStyle();
    }

    this.context.fillText(text.getText(), 0, 30);

    this.context.font = this.defaultFont.toString();
  }
}