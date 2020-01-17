export default class Vector2 {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(addend: Vector2): Vector2 {
    return new Vector2(
      this.x + addend.x,
      this.y + addend.y
    );
  }

  subtract(addend: Vector2): Vector2 {
    return new Vector2(
      this.x - addend.x,
      this.y - addend.y
    );
  }

  multiplyByNumber(multiplicand: number): Vector2 {
    return new Vector2(
      this.x * multiplicand,
      this.y * multiplicand
    );
  }

  multiply(multiplicand: number): Vector2 {
    return new Vector2(
      this.x * multiplicand,
      this.y * multiplicand
    );
  }

  divide(division: number): Vector2 {
    return new Vector2(
      this.x / division,
      this.y / division
    );
  }
}