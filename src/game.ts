import {GameScreen} from './screen';
import Vector2 from './vector2';
import Sprite from './image';
import MissingImage from './missing.png';
import Controller from './controller';
import EventDispatcher from './eventdispatcher';
import Player from './player';

export class Game {
  screen: GameScreen;
  controller: Controller;
  eventDispatcher: EventDispatcher;
  player: Player;

  running: boolean = true;
  lastLoop: number;
  sprite: Sprite;

  constructor(screen: GameScreen){
    this.screen = screen;
    this.sprite = new Sprite(MissingImage, new Vector2(40, 40));
    this.eventDispatcher = new EventDispatcher;
    this.player = new Player(this.eventDispatcher);
    this.controller = new Controller(this.eventDispatcher);
  }

  setup() {
    this.screen.addEventListener("keydown", (event: Event) => this.controller.onKeyDown(<KeyboardEvent>event));
  }

  loop() {

    if(!this.lastLoop) {
      this.lastLoop = performance.now();
    }

    if (this.running) requestAnimationFrame((time: number) => this.render(time));
  }

  update(progress: number) {}

  render(time: number) {

    this.update(time - this.lastLoop);

    this.screen.clear();
    this.screen.drawFps(time);

    this.screen.drawSprite(this.sprite, new Vector2(50, 50));
    this.loop();
  }
}