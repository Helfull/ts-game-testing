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
import World from './world';
import Tile from './tile';
import TileType from './tileType';
import FontText from './render/fonttext';
import FontStyle from './render/fontstyle';

export class Game {
  screen: GameScreen;
  controller: Controller;
  eventDispatcher: EventDispatcher;
  player: Player;
  world: World;

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

    this.world = new World();
  }

  setup() {
    this.screen.addEventListener("keydown",(event: Event) => this.controller.onKeyDown(<KeyboardEvent>event));
    this.screen.addEventListener("keyup", (event: Event) => this.controller.onKeyUp(<KeyboardEvent>event));

    this.debugElement = document.getElementById('debugElement');

    const map: Tile[][] = [];
    for(let x = 0; x < 200; x++) {
      map[x] = [];
      for (let y = 0; y < 200; y++) {
        map[x][y] = new Tile(TileType.WATER);
      }
    }

    this.world.setMap(map);
  }

  loop() {

    this.lastLoop = performance.now();

    if (this.running) requestAnimationFrame((time: number) => this.render(time));
  }

  update(progress: number) {
    this.player.update(progress);

    this.camera.position = this.player.position.add(this.screen.canvasSize.divide(2));
  }

  render(time: number) {

    this.update(time - this.lastLoop);

    this.screen.clear();

    this.screen.save(this.camera);
    this.world.render(this.screen);

    this.debugElement.textContent = JSON.stringify({
      player: {...this.player, anchorPos: this.player.sprite.getAnchorPosition()},
      camera: this.camera
    }, null, 2);

    this.player.render(time, this.screen);
    this.screen.restore();
    const debugTextData: string[]= [
      "ScreenCenter: " + this.screen.canvasSize.divide(2).toString(),
      "Camera: " + this.camera.position.toString(),
      "Player: " + this.player.position.toString()
    ];
    for (let i = 0; i < debugTextData.length; i++) {
      this.screen.drawText(
        new FontText(
          debugTextData[i],
          new FontStyle("32px", "Fira Code")
        ),
        new Vector2(0, 60).add(new Vector2(0, i * 30))
    );
    }
    this.screen.drawFps(time);
    this.screen.drawDebug();
    this.loop();
  }
}