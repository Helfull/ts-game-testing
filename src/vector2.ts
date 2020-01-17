export default class Vector2 {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  isBetween(a: Vector2, b: Vector2): boolean
  {
    return (this.x > a.x && this.x < b.x) &&
           (this.y > a.y && this.y < b.y);
  }

  add(addend: Vector2|number): Vector2 {
    const x = addend instanceof Vector2 ? addend.x : addend;
    const y = addend instanceof Vector2 ? addend.y : addend;
    return new Vector2(
      this.x + x,
      this.y + y
    );
  }

  subtract(addend: Vector2 | number): Vector2 {
    const x = addend instanceof Vector2 ? addend.x : addend;
    const y = addend instanceof Vector2 ? addend.y : addend;
    return new Vector2(
      this.x - x,
      this.y - y
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

  toString(): string
  {
    return `x: ${this.x}, y: ${this.y}`;
  }
}