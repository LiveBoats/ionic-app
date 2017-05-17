export class Size {
  private _width : number = 0.0;

  private _length : number = 0.0;

  constructor() {}

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get length(): number {
    return this._length;
  }

  set length(value: number) {
    this._length = value;
  }
}
