import Tile from "./tile";
import Vector2 from "./vector2";
import { GameScreen } from "./screen";

export default class World {

  private map: Tile[][];
  tileSize: number;

  setMap(map: Tile[][] = [], tileSize: number = 64): void
  {
    this.map = map;
    this.tileSize = tileSize;
  }

  getMap(): Tile[][]
  {
    return this.map;
  }

  render(screen: GameScreen): void
  {
    for(let x = 0; x < 200; x++)
    {
      for (let y = 0; y < 200; y++)
      {
        const position = new Vector2(x, y).multiply(this.tileSize);
        // screen.drawCircle(this.tileSize, position)
        screen.drawSprite(
          this.map[x][y].sprite,
          position
        );
      }
    }
  }
}