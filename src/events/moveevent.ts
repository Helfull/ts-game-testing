import InputEvent from "./inputEvent";

export default class MoveEvent extends InputEvent {
  public static UP: string = "MOVE_UP";
  public static DOWN: string = "MOVE_DOWN";
  public static LEFT: string = "MOVE_LEFT";
  public static RIGHT: string = "MOVE_RIGHT";
}