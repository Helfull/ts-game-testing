import EventDispatcher from "./eventdispatcher";
import MoveEvent from "./events/moveevent";
import Entity from "./entity";
import Vector2 from "./vector2";
import Sprite from "./image";
import ShipImage from "./assets/ship.png";
import { GameScreen } from "./screen";
import Anchor from "./anchor";

export default class Player extends Entity {

  private moveEvents: { [event: string]: boolean };

  speed: number = 0.5;

  sprite: Sprite;

  constructor(eventDispatcher: EventDispatcher) {
    super();
    this.moveEvents = {};
    this.sprite = new Sprite(ShipImage);
    this.sprite.flip(new Vector2(1, -1));
    this.sprite.anchor = Anchor.center();

    eventDispatcher.listen(MoveEvent.UP, (args: Array<any>) => this.moveEvent(args[0]));
    eventDispatcher.listen(MoveEvent.DOWN, (args: Array<any>) => this.moveEvent(args[0]));
    eventDispatcher.listen(MoveEvent.LEFT, (args: Array<any>) => this.moveEvent(args[0]));
    eventDispatcher.listen(MoveEvent.RIGHT, (args: Array<any>) => this.moveEvent(args[0]));
  }

  private moveEvent(event: MoveEvent): void {
    this.moveEvents[event.name] = event.active;
  }

  update(progress: number): void {
    this.updateVelocity(progress);
    super.update(progress);
  }

  render(time: number, screen: GameScreen): void {
    screen.drawSprite(this.sprite, this.position);
  }

  private updateVelocity(progress: number): void
  {
    let velocity: Vector2 = new Vector2(0, 0);

    if (this.moveEvents[MoveEvent.UP]) velocity.y -= this.speed;
    if (this.moveEvents[MoveEvent.DOWN]) velocity.y += this.speed;
    if (this.moveEvents[MoveEvent.RIGHT]) velocity.x += this.speed;
    if (this.moveEvents[MoveEvent.LEFT]) velocity.x -= this.speed;

    this.velocity = velocity;
  }
}