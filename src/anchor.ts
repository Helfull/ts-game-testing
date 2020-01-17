export default class Anchor {
  public static readonly LEFT: string = 'LEFT';
  public static readonly RIGHT: string = 'RIGHT';
  public static readonly TOP: string = 'TOP';
  public static readonly BOTTOM: string = 'BOTTOM';

  anchors: Array<string>;

  constructor() {
    this.anchors = [];
  }

  static center(): Anchor {
    const centerAnchor = new Anchor;
    centerAnchor.add(Anchor.LEFT);
    centerAnchor.add(Anchor.RIGHT);
    centerAnchor.add(Anchor.TOP);
    centerAnchor.add(Anchor.BOTTOM);
    return centerAnchor;
  }

  remove(anchor: string): void {
    this.anchors = this.anchors.filter((item, index) => item !== anchor);
  }

  add(anchor: string): void {
    this.anchors.push(anchor);
    this.anchors = this.anchors.filter((item, index) => {
      return this.anchors.indexOf(item) === index
    });
  }

  contains(anchor: string): boolean {
    return this.anchors.includes(anchor);
  }

}