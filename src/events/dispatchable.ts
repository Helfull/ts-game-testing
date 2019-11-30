import { Collection, collect } from "collect.js";

export default class Dispatchable {

  name: string;

  callbacks: Collection<VoidFunction>;

  constructor(name: string) {
    this.name = name;
    this.callbacks = collect([]);
  }

  dispatch() {
    this.callbacks.each((callback: VoidFunction) => callback());
  }

  listen(callback: VoidFunction) {
    this.callbacks.push(callback);
  }

}