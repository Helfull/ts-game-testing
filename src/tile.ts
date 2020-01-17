import Vector2 from "./vector2";
import { GameScreen } from "./screen";
import TileType from "./tileType";

export default class Tile {
  sprite: any;
  type: string;

  constructor(type: string)
  {
    this.type = type;
    this.sprite = TileType.getSprite(this.type);
  }
}