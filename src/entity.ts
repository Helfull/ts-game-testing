import Vector2 from "./vector2";

export default class Entity {

  position: Vector2;
  velocity: Vector2;

  constructor(
    position: Vector2 = new Vector2(0, 0),
    velocity: Vector2 = new Vector2(0, 0)
  ) {
    this.position = position;
    this.velocity = velocity;
  }

  update(progress: number): void {
    this.position = this.position.add(this.velocity.multiplyByNumber(progress));
  }

}