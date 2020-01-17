import FontText from './render/fonttext';
import FontStyle from './render/fontstyle';
import Vector2 from './vector2';
import Sprite from './image';
import Camera from './camera';

export class GameScreen {
  canvasId: string;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  fps: string;
  lastRender: number;
  defaultFont: FontStyle;
  camera: Camera;
  canvasSize: Vector2;

  constructor(
    canvasId: string,
    defaultFont: FontStyle = new FontStyle("", "32px", "serif")
  ) {
    this.canvasId = canvasId;
    this.defaultFont = defaultFont;
    this.buildCanvasContext();
    this.canvasSize = new Vector2(this.canvas.width, this.canvas.height);
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

  scale(scale: Vector2): void {
    this.context.scale(scale.x, scale.y);
  }

  translate(translation: Vector2): void {
    this.context.translate(translation.x, translation.y);
  }

  fill(sprite: Sprite) {
    if (sprite.isLoaded) {
      const screenWidth: number = this.canvas.width;
      const screenHeight: number = this.canvas.height;

      const spriteWidth: number = sprite.size.x
      const spriteHeight: number = sprite.size.y

      const tilesH = Math.ceil(screenWidth / spriteWidth);
      const tilesV = Math.ceil(screenHeight / spriteHeight);

      for (let x = 0; x < tilesH; x++) {
        for (let y = 0; y < tilesV; y++) {
          this.drawSprite(sprite, new Vector2(x * spriteWidth, y * spriteHeight));
        }
      }
    }
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

  save(camera: Camera = undefined) {
    this.context.save();

    if(camera !== undefined) {
      this.translate(camera.position.add(this.canvasSize.divide(2)));
      this.camera = camera;
    }
  }

  restore() {
    this.camera = undefined;
    this.context.restore();
  }

  drawCircle(radius: number, position: Vector2) {
    this.context.beginPath();
    this.context.arc(position.x, position.y, radius, 0, 360, false);
    this.context.fill();
  }

  drawRectangle(size: Vector2, position: Vector2): void {
    this.context.beginPath();
    this.context.rect(position.x, position.y, size.x, size.y);
    this.context.stroke();
  }

  drawSprite(sprite: Sprite, position: Vector2) {
    const realPosition: Vector2 = position.subtract(sprite.getAnchorPosition());
    this.context.drawImage(sprite.getSource(), realPosition.x, realPosition.y);
  }

  drawText(text: FontText) {
    if (text.getStyle()) {
      this.context.font = text.getStyle();
    }

    this.context.fillText(text.getText(), 0, 30);
    this.context.font = this.defaultFont.toString();
  }

  drawDebug() {
    this.context.strokeStyle = 'red';
    this.context.beginPath();
    this.context.moveTo(0, this.canvas.height / 2);
    this.context.lineTo(this.canvas.width, this.canvas.height / 2);

    this.context.moveTo(this.canvas.width / 2, 0);
    this.context.lineTo(this.canvas.width / 2, this.canvas.height);
    this.context.stroke();

    if(this.camera) {
      this.drawCircle(24, this.camera.position);
    }
    this.context.strokeStyle = 'black';
  }
}