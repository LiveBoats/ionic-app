import { Position } from "./position";
import { Size } from "./size"
import { Type } from "./type";

/**
 * Boat model
 */
export class Boat {

  /**
   * MMSI boat code
   * @type {string}
   * @private
   */
  private _mmsi : string = "";

  /**
   * IMO boat code (International Maritime Organization)
   * @type {string}
   * @private
   */
  private _imo : string = "";

  /**
   * Boat name
   * @type {string}
   * @private
   */
  private _name : string = "";

  /**
   * Boat position if available
   * @type {Position}
   * @private
   */
  private _position: Position = null;

  /**
   * Boat size
   * @type {Size}
   * @private
   */
  private _size: Size = null;

  /**
   * Draught : Height under water
   * @type {number}
   * @private
   */
  private _draught : number = 0;

  private _callsign : string = "";

  private _type: Type = Type.UNDEFINED;

  constructor() {
    this.position = new Position();
    this.size = new Size();
  }

  get size(): Size {
    return this._size;
  }

  set size(value: Size) {
    this._size = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get mmsi(): string {
    return this._mmsi;
  }

  set mmsi(value: string) {
    this._mmsi = value;
  }

  get position(): Position {
    return this._position;
  }

  set position(value: Position) {
    this._position = value;
  }


  get imo(): string {
    return this._imo;
  }

  set imo(value: string) {
    this._imo = value;
  }

  get draught(): number {
    return this._draught;
  }

  set draught(value: number) {
    this._draught = value;
  }

  get callsign(): string {
    return this._callsign;
  }

  set callsign(value: string) {
    this._callsign = value;
  }

  get type(): Type {
    return this._type;
  }

  set type(value: Type) {
    this._type = value;
  }

  /**
   * Extract data from Le Havre Port API
   * @param data
   */
  public hydrate(data) : void {
    this.position.latitude = data.lat;
    this.position.longitude = data.lon;
    this.position.heading = data.heading;
    this.position.speed = data.speed;
    this.size.length = data.batLong;
    this.size.width = data.batLarg;
    this.mmsi = data.mmsi || data.batMmsi;
    this.name = data.nom || data.name;
    this.imo = data.imo;
    this.draught = data.draught;
    this.callsign = data.callsign;
    this.type = Type[ Type[ data.shiptype ] ];
  }

  /**
   * @return array of label/item objects of all available properties
   */
  public getProperties() {
    return [
      {
        label: 'MMSI',
        value: this.mmsi
      },
      {
        label: 'IMO',
        value: this.imo
      },
      { label: 'Draught',
        value: this.draught + ' m',
      },
      {
        label: 'Callsign',
        value: this.callsign
      }
    ];
  }

  /**
   * Create Boat statically
   * @param data
   * @returns {Boat}
   */
  public static fromWebCall(data) : Boat {
    let myBoat = new Boat();
    myBoat.hydrate(data);
    return myBoat;
  }
}
