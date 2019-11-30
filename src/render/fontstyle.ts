export default class FontStyle {
  weight: string;
  size: string;
  font: string;

  constructor(
    size: string = "16px",
    font: string = "serif",
    weight: string | null = null
  ) {
    this.size = size;
    this.font = font;
    this.weight = weight || "";
  }

  toString(): string {
    return [
      this.weight,
      this.size,
      this.font
    ].join(' ');
  }
}