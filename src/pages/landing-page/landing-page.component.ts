import { Component, OnInit } from '@angular/core';
import { DeviceOrientation } from '@ionic-native/device-orientation';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { Boat } from '../../app/models/boat';
import { Position } from '../../app/models/position';
import { DataService } from '../../app/providers/api.service';
import { BoatList } from '../boat-list/boat-list.component';
import { Area } from "../../app/utils/area";


@Component({
  selector: 'landing-page',
  templateUrl: './template.html',
  providers: [
    Geolocation,
    DeviceOrientation
  ]
})
export class LandingPage implements OnInit {
  /**
   * All boats in API
   */
  private boats: Array<Boat> = [];

  /**
   * Boats which are near the user
   */
  private boatsInSight: Array<Boat> = [];

  /**
   * Indicate if a network operation is ongoing
   */
  private isLoading = true;

  /**
   * Icons that could be displayed
   */
  private icons = {
    loading: 'refresh',
    ready: 'boat'
  }

  /**
   * Icon name that should be displayed
   */
  private fabIcon = this.icons.loading;

  /**
   * Struct that hold current user position and heading
   */
  private location = new Position();

  /**
   * Area around the user
   */
  private userArea: Area;

  constructor(
    private navCtrl: NavController,
    private dataService: DataService,
    private geolocation: Geolocation,
    private deviceOrientation: DeviceOrientation
  ) {

  }

  ngOnInit(): void {
    this.geolocation.watchPosition({ enableHighAccuracy: true })
      .subscribe((data) => {

        console.log('posision acquired', data);

        this.location.latitude = data.coords.latitude;
        this.location.longitude = data.coords.longitude;

        if (data.coords.heading === null) {
          this.deviceOrientation.getCurrentHeading().then((data) => {
            console.log('heading acquired', data);

            this.location.heading = data.trueHeading;
          });
        } else {
          this.location.heading = data.coords.heading;
        }
      });

    Observable.interval(10000).subscribe(() => {
      this.retrieveBoats();
    });
  }

  /**
   * Retrieve boats from API, then determines wgich ones are in user's area
   */
  private retrieveBoats() {
    this.toggleReadyState();

    this.dataService.getBoats().subscribe(
      boats => {
        this.boats = boats;

        this.userArea = Area.getArea(this.location, 90, 70, this.location.heading);
        this.boatsInSight = this.userArea.getBoatsInArea(this.boats);

        this.toggleReadyState();
      },
      error => console.log(error)
    )
  }

  /**
   * Toggling ready/loading state
   */
  private toggleReadyState() : void {
    // toggling boolean
    this.isLoading = !this.isLoading;

    // toggling icon
    if (this.fabIcon === this.icons.loading) {
      this.fabIcon = this.icons.ready;
      return;
    }

    if (this.fabIcon === this.icons.ready) {
      this.fabIcon = this.icons.loading;
    }
  }

  /**
   * Show all the boats returned by the service
   */
  private showBoatList() {
    if (this.isLoading === false) {
      this.navCtrl.push(BoatList, { 'boats': this.boatsInSight })
    }
  }

}
