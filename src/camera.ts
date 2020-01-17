import Vector2 from "./vector2";
import Entity from "./entity";

export default class Camera {

  position: Vector2;
  zoom: number;

  private attachedEntity: Entity;
  private attachedOffset: Vector2;

  constructor(position: Vector2 = new Vector2(0, 0), zoom: number = 100) {
    this.position = position;
    this.zoom = zoom;
  }

  attachEntity(entity: Entity, offset: Vector2 = new Vector2(0,0)): void {
    this.attachedEntity = entity;
    this.attachedOffset = offset;
  }

  update(progress: number): void {
    if (this.attachedEntity) {
      this.position = this.attachedEntity.position.add(this.attachedOffset);
    }
  }

}