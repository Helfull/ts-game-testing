import DispatchFunction from "./dispatchFunction";

export default class Dispatchable {

  name: string;

  callbacks: Array<DispatchFunction>;

  constructor(name: string) {
    this.name = name;
    this.callbacks = [];
  }

  dispatch(args: Array<any>) {
    this.callbacks.forEach((callback: DispatchFunction) => callback(args));
  }

  listen(callback: DispatchFunction) {
    this.callbacks.push(callback);
  }

}