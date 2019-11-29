import {GameScreen} from './screen';

export class Game {
  screen: GameScreen;
  running: boolean = true;
  lastLoop: number;

  constructor(screen: GameScreen){
    this.screen = screen;
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
    this.loop();
  }
}