import Vector2 from "./vector2";
import Anchor from "./anchor";

export default class Sprite {

  anchor: Anchor;

  src: string;
  size: Vector2;
  source: HTMLImageElement;

  flipVector: Vector2 = new Vector2(1, 1);

  isLoaded: boolean = false;

  constructor(src: string, size: Vector2 = null) {
    this.size = size;
    this.src = src;
    const source = new Image();
    source.src = this.src;
    this.source = source;

    this.anchor = new Anchor;

    source.onload = (event) => {
      this.isLoaded = true;
      if (this.size === null) {
        this.size = new Vector2(this.source.width, this.source.height);
      }
    };
  }

  flip(vector: Vector2): void {
    this.flipVector = vector;
  }

  getAnchorPosition(): Vector2 {
    if (!this.size) { return new Vector2(0, 0); }

    const anchorPosition = new Vector2(0, 0);

    if (this.anchor.contains(Anchor.BOTTOM) && this.anchor.contains(Anchor.TOP)) {
      anchorPosition.y = this.size.y / 2;
    } else if (this.anchor.contains(Anchor.BOTTOM)) {
      anchorPosition.y = this.size.y;
    }

    if (this.anchor.contains(Anchor.LEFT) && this.anchor.contains(Anchor.RIGHT)) {
      anchorPosition.x = this.size.x / 2;
    } else if (this.anchor.contains(Anchor.LEFT)) {
      anchorPosition.x = this.size.x;
    }

    return anchorPosition;
  }

  getSource(): HTMLImageElement {
    return this.source;
  }

}