import FontStyle from "./fontstyle";

export default class FontText {
  style: FontStyle | string | null;
  text: string;

  constructor(text: string, style: FontStyle | string | null = null) {
    this.text = text;
    this.style = style;
  }

  getText(): string {
    return this.text;
  }

  getStyle(): string {
    return this.style.toString();
  }
}