import Keys from "./keys";
import EventDispatcher from "./eventdispatcher";
import MoveEvent from "./events/moveevent";

export default class Controller {

  eventDispatcher: EventDispatcher;

  constructor(eventDispatcher: EventDispatcher) {
    this.eventDispatcher = eventDispatcher;
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === Keys.W) { this.eventDispatcher.emit(MoveEvent.UP) } // W
    else if (event.keyCode === Keys.A) { this.eventDispatcher.emit('moveLeft') } // S
    else if (event.keyCode === Keys.S) { this.eventDispatcher.emit('moveDown') } // A
    else if (event.keyCode === Keys.D) { this.eventDispatcher.emit('moveRight') } // D
  }

}