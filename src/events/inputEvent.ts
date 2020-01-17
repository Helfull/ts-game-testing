export default class InputEvent {

  public readonly active: boolean;
  public readonly name: string;

  constructor(name: string, active: boolean = false) {
    this.name = name;
    this.active = active;
  }
}