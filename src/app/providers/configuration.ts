/**
 * Created by thomas on 30/11/16.
 * This file contains only API key for http://ais.owm.io/
 */

export class Configuration {
  url : any = "http://api.ais.owm.io/1.2/";

  vessel_url : any = "vessels/{MMSI}.json?api_key=";
  polygon_url : any = "vessels.json?bbox={LON_LEFT},{LAT_BOTTOM},{LON_RIGHT},{LAT_TOP}.json&api_key=";
}
