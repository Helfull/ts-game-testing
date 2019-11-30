import Vector2 from "./vector2";

export default class Sprite {
  src: string;
  size: Vector2;
  source: HTMLImageElement;

  constructor(src: string, size: Vector2) {
    this.src = src;
    this.size = size;
    const source = new Image();
    source.src = this.src;
    this.source = source;
  }

  getSource(): HTMLImageElement {
    return this.source;
  }

}