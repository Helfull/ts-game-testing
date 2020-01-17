import Keys from "./keys";
import EventDispatcher from "./eventdispatcher";
import MoveEvent from "./events/moveevent";
import InputEvent from "./events/inputEvent";

export default class Controller {

  eventDispatcher: EventDispatcher;

  keyMap: { [key: number]: string };

  constructor(eventDispatcher: EventDispatcher) {
    this.eventDispatcher = eventDispatcher;

    this.keyMap = {
      [Keys.W]: MoveEvent.UP,
      [Keys.S]: MoveEvent.DOWN,
      [Keys.A]: MoveEvent.LEFT,
      [Keys.D]: MoveEvent.RIGHT,

      [Keys.UP]: MoveEvent.UP,
      [Keys.DOWN]: MoveEvent.DOWN,
      [Keys.LEFT]: MoveEvent.LEFT,
      [Keys.RIGHT]: MoveEvent.RIGHT
    };
  }

  onKeyDown(event: KeyboardEvent): void {
    if (! this.keyConfigured(event.keyCode)) return;
    let eventName: string = this.getEventName(event.keyCode);
    this.onMove(new InputEvent(eventName, true))
  }

  onKeyUp(event: KeyboardEvent): void {
    if (!this.keyConfigured(event.keyCode)) return;
    let eventName: string = this.getEventName(event.keyCode);
    this.onMove(new InputEvent(eventName))
  }

  onMove(event: InputEvent): void {
    this.eventDispatcher.emit(event.name, [event])
  }

  keyConfigured(keyCode: number): boolean {
    return keyCode in this.keyMap;
  }

  getEventName(keyCode: number): string {
    return this.keyMap[keyCode];
  }

}