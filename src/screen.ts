import FontText from './render/fonttext';
import FontStyle from './render/fontstyle';
import Vector2 from './vector2';
import Sprite from './image';

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
    this.canvas.setAttribute("tabindex", "0");
    this.canvas.focus();
    this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");
  }

  addEventListener(eventString: string, callback: (event: Event)=>any) {
    this.canvas.addEventListener(eventString, callback);
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

  drawSprite(sprite: Sprite, vector2d: Vector2) {
    this.context.drawImage(sprite.getSource(), vector2d.x, vector2d.y);
  }

  drawText(text: FontText) {
    if (text.getStyle()) {
      this.context.font = text.getStyle();
    }

    this.context.fillText(text.getText(), 0, 30);

    this.context.font = this.defaultFont.toString();
  }
}