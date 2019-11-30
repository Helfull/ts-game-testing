import collect, { Collection } from 'collect.js';
import Dispatchable from './events/dispatchable';

export default class EventDispatcher {

  events: Collection<Dispatchable>;

  constructor() {
    this.events = collect();
  }

  emit(eventName: string):void {
    if (!this.events.has(eventName)) return;

    this.events.get(eventName).dispatch();
  }

  listen(eventName: string, callback: VoidFunction): void {
    if (!this.events.has(eventName)) {
      this.events.put(eventName, new Dispatchable(eventName));
    }

    this.events.get(eventName).listen(callback);
  }
}
