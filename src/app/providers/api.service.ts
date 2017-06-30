/**
 * Created by thomas on 30/11/16.
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Rx";
import { Boat } from "../models/boat";

@Injectable()
export class DataService {
  static URL : string = "https://www.havre-port.com/map/getBoats";
  constructor(private http: Http) {};

  getBoats(): Observable<Boat[]> {
    return this.http.get( DataService.URL )
      .map((response : Response) => {
        return response.json().map( (mapData) => Boat.fromWebCall(mapData));
      })
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
