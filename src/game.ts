import {GameScreen} from './screen';
import Vector2 from './vector2';
import Sprite from './image';
import MissingImage from './missing.png';
import Controller from './controller';
import EventDispatcher from './eventdispatcher';
import Player from './player';
import Water from './assets/water.png';
import Camera from './camera';
import Rock from './assets/tile_66.png';

export class Game {
  screen: GameScreen;
  controller: Controller;
  eventDispatcher: EventDispatcher;
  player: Player;

  running: boolean = true;
  lastLoop: number;
  waterSprite: Sprite;
  rockSprite: Sprite;

  debugElement: HTMLElement;

  camera: Camera;

  constructor(screen: GameScreen){
    this.screen = screen;
    this.waterSprite = new Sprite(Water);
    this.rockSprite = new Sprite(Rock);
    this.eventDispatcher = new EventDispatcher;
    this.player = new Player(this.eventDispatcher);
    this.controller = new Controller(this.eventDispatcher);
    this.camera = new Camera(this.player.position);
  }

  setup() {
    this.screen.addEventListener("keydown",(event: Event) => this.controller.onKeyDown(<KeyboardEvent>event));
    this.screen.addEventListener("keyup", (event: Event) => this.controller.onKeyUp(<KeyboardEvent>event));

    this.debugElement = document.getElementById('debugElement');

    this.camera.attachEntity(this.player, new Vector2(0, -10));
  }

  loop() {

    this.lastLoop = performance.now();

    if (this.running) requestAnimationFrame((time: number) => this.render(time));
  }

  update(progress: number) {
    this.player.update(progress);
    this.camera.update(progress);
  }

  render(time: number) {

    this.update(time - this.lastLoop);

    this.screen.fill(this.waterSprite);

    this.screen.save(this.camera);
    this.screen.drawSprite(this.rockSprite, new Vector2(-100, -1000));
    this.player.render(time, this.screen);

    this.debugElement.textContent = JSON.stringify({
      player: {...this.player, anchorPos: this.player.sprite.getAnchorPosition()},
      camera: this.camera,
    }, null, 2);
    this.screen.restore();
    this.screen.drawFps(time);
    this.screen.drawDebug();
    this.loop();
  }
}