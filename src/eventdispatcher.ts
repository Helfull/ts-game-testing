import Dispatchable from './events/dispatchable';
import DispatchFunction from './events/dispatchFunction';

export default class EventDispatcher {

  events: { [eventName: string]: Dispatchable; };

  constructor() {
    this.events = {};
  }

  emit(eventName: string, args: Array<any> = []):void {
    if (this.events[eventName] == undefined) return;

    this.events[eventName].dispatch(args);
  }

  listen(eventName: string, callback: DispatchFunction): void {
    if (this.events[eventName] == undefined) {
      this.events[eventName] = new Dispatchable(eventName);
    }

    this.events[eventName].listen(callback);
  }
}
