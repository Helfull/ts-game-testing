import EventDispatcher from "./eventdispatcher";
import MoveEvent from "./events/moveevent";

export default class Player {

  eventDispatcher: EventDispatcher

  constructor(eventDispatcher: EventDispatcher) {
    this.eventDispatcher = eventDispatcher;

    this.eventDispatcher.listen(MoveEvent.UP, () => this.moveUp());
    this.eventDispatcher.listen(MoveEvent.UP, () => this.moveDown());
    this.eventDispatcher.listen(MoveEvent.UP, () => this.moveLeft());
    this.eventDispatcher.listen(MoveEvent.UP, () => this.moveRight());
  }

  moveUp(): void {
    console.log('MOVE UP');
  }

  moveDown(): void {
    console.log('MOVE UP');
  }

  moveLeft(): void {
    console.log('MOVE UP');
  }

  moveRight(): void {
    console.log('MOVE UP');
  }

}