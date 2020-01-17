import Vector2 from "./vector2";
import Entity from "./entity";

export default class Camera {

  position: Vector2;
  zoom: number;

  private attachedEntity: Entity;

  constructor(position: Vector2 = new Vector2(0, 0), zoom: number = 100) {
    this.position = position;
    this.zoom = zoom;
  }

}