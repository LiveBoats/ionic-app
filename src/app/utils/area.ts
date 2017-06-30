import { Position } from "../models/position";
import { Boat } from "../models/boat";


export class Area {
  public static EARTH_RADIUS : number = 6378.1;

  private _originalPosition : Position = null;

  private _firstExtremity : Position = null;

  private _secondExtremity : Position = null;

  constructor(originalPosition: Position) {
    this._originalPosition = originalPosition;
  }

  get originalPosition(): Position {
    return this._originalPosition;
  }

  set originalPosition(value: Position) {
    this._originalPosition = value;
  }

  get firstExtremity(): Position {
    return this._firstExtremity;
  }

  set firstExtremity(value: Position) {
    this._firstExtremity = value;
  }

  get secondExtremity(): Position {
    return this._secondExtremity;
  }

  set secondExtremity(value: Position) {
    this._secondExtremity = value;
  }

  /**
   * Get an area for simulate view over the phone
   * @param originalPosition Actual user geolocation position
   * @param viewAngle View angle in degrees
   * @param distanceInKm Distance of view in KM
   * @param heading Heading in degrees clockwise from north
   * @returns {Area}
   */
  public static getArea( originalPosition : Position, viewAngle : number, distanceInKm : number, heading: number ) : Area {
    let myArea : Area = new Area(originalPosition);

    myArea.firstExtremity = Area.computeNewPosition( heading - viewAngle / 2, distanceInKm, originalPosition );
    myArea.secondExtremity = Area.computeNewPosition( heading + viewAngle / 2, distanceInKm, originalPosition );

    return myArea;
  }

  /**
   * Determine if a point is in area
   * @param position
   * @link https://stackoverflow.com/a/2049593
   */
  public isInArea( position : Position ) : boolean {
    let mySignFunction = (position1 : Position, position2 : Position, position3 : Position ) => {
      return (position1.latitude - position3.latitude) * (position2.longitude - position3.longitude) - (position2.latitude - position3.latitude) * (position1.longitude - position3.longitude)
    };

    let myBool1, myBool2, myBool3 : boolean;
    myBool1 = mySignFunction( position, this.originalPosition, this.firstExtremity ) < 0.0;
    myBool2 = mySignFunction( position, this.firstExtremity, this.secondExtremity ) < 0.0;
    myBool3 = mySignFunction( position, this.secondExtremity, this.originalPosition ) < 0.0;

    return myBool1 == myBool2 && myBool2 == myBool3;
  }

  public static deg2rad( angle : number ) : number {
    return (angle / 180) * Math.PI;
  }

  public static rad2deg( angle : number ) : number {
    return (angle / Math.PI) * 180;
  }

  /**
   * Compute a position from a first.
   * @param heading Actual heading view angle (in degres)
   * @param distanceInKm Distance far from original position
   * @param originalPosition Actual user position
   * @link https://stackoverflow.com/a/7835325
   */
  public static computeNewPosition(heading : number, distanceInKm: number, originalPosition : Position) : Position {
    let myHeadingRadian : number = Area.deg2rad( heading );
    let myRadianOriginalPosition : Position = new Position();
    myRadianOriginalPosition.longitude = Area.deg2rad( originalPosition.longitude );
    myRadianOriginalPosition.latitude = Area.deg2rad( originalPosition.latitude );

    let myLatitude : number = Math.asin( Math.sin( myRadianOriginalPosition.latitude ) * Math.cos( distanceInKm / Area.EARTH_RADIUS ) + Math.cos( myRadianOriginalPosition.latitude ) * Math.sin( distanceInKm / Area.EARTH_RADIUS) * Math.cos( myHeadingRadian ) );
    let myLongitude : number = myRadianOriginalPosition.longitude + Math.atan2(
      Math.sin( myHeadingRadian ) * Math.sin( distanceInKm / Area.EARTH_RADIUS )  * Math.cos( myRadianOriginalPosition.latitude ),
      Math.cos( distanceInKm / Area.EARTH_RADIUS ) - Math.sin( myRadianOriginalPosition.latitude ) * Math.sin( myLatitude )
    );

    let myOutPosition : Position = new Position();
    myOutPosition.latitude = Area.rad2deg( myLatitude );
    myOutPosition.longitude = Area.rad2deg( myLongitude );
    return myOutPosition;
  }

  /**
   * Return all boat in that Area from a boat array. You must have call static method Area.getArea() before call that.
   * @param boats Boats list generated from service
   * @returns {Boat[]}
   */
  public getBoatsInArea( boats : Boat[] ) : Boat[] {
    let that = this;
    return boats.filter( boat => {
      return that.isInArea( boat.position );
    });
  }
}
