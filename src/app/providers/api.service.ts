/**
 * Created by thomas on 30/11/16.
 */

import { Configuration } from "./configuration"
import { Key } from "./key"
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Vessel } from '../models/vessel';

@Injectable()
export class DataService {

  private headers: Headers;

  private key: Key;

  constructor(private http: Http, private configuration: Configuration) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.key = new Key();
  };

  public getVesselBaseFromMmsi = (mmsi: string): Observable<Vessel> => {
    return this.http.get(this.configuration.url + this.configuration.vessel_url.replace("{MMSI}", mmsi) + this.key.key)
      .map((response: Response) => <Vessel>response.json())
      .catch(this.handleError);
  };

  public getVesselsInArea = (lonLeft: number, latLeft: number, lonRight: number, latRight: number): Observable<Vessel[]> => {
    return this.http.get(this.configuration.url + this.configuration.polygon_url.replace("{LON_LEFT}", lonLeft).replace("{LAT_BOTTOM}", latLeft).replace("{LON_RIGHT}", lonRight).replace("{LAT_TOP}", latRight) + this.key.key)
      .map((response: Response) => <Vessel>response.json())
      .catch(this.handleError);
  };

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  };
}
