import Vector2 from "./vector2";
import Sprite from "./image";
import WaterImage from "./assets/water.png";

export default class TileType {
  public static readonly WATER: string = 'WATER';

  private static SpriteMap: { [type: string]: Sprite } = {
    [TileType.WATER]: new Sprite(WaterImage)
  };

  static getSprite(type: string): any {
    if(!(type in TileType.SpriteMap)) {
      throw "type is not defined";
    }

    return TileType.SpriteMap[type];
  }
}