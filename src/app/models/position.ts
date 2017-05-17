export class Position {
  private _latitude : number = 0.0;

  private _longitude : number = 0.0;

  private _heading : number = 0;

  private _speed : number = 0.0;

  /**
   * Indicate if data has been setted
   * @type {boolean}
   * @private
   */
  private _data : boolean = false;

  constructor() {}

  get latitude(): number {
    return this._latitude;
  }

  set latitude(value: number) {
    this._latitude = value;
    this.data = true;
  }

  get longitude(): number {
    return this._longitude;
  }

  set longitude(value: number) {
    this._longitude = value;
    this.data = true;
  }

  get heading(): number {
    return this._heading;
  }

  set heading(value: number) {
    this._heading = value;
    this.data = true;
  }

  get speed(): number {
    return this._speed;
  }

  set speed(value: number) {
    this._speed = value;
    this.data = true;
  }

  get data(): boolean {
    return this._data;
  }

  set data(value: boolean) {
    this._data = value;
  }
}
