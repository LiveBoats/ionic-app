import { Position } from "./position";
import { Size } from "./size"

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
    this.name = data.nom;
    this.imo = data.imo;
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
