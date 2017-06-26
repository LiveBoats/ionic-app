import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Boat }        from '../../app/models/boat';
import { BoatList }    from '../boat-list/boat-list.component';
import { DataService } from '../../app/providers/api.service';


@Component({
  selector: 'landing-page',
  templateUrl: './template.html'
})
export class LandingPage implements OnInit {
  /**
   * All boats in sight
   */
  private boats : Array<Boat> = [];

  /**
   * Indicate if a network operation is ongoing
   */
  private isLoading = true;

  /**
   * Icon name that should be displayed
   */
  private icon = "refresh";

  ngOnInit(): void {
    this.dataService.getBoats().subscribe(
      boats => {
        this.boats = boats;
        this.setButtonReady();
      },
      error => console.log(error)
    )
  }

  constructor(
    private navCtrl: NavController,
    private dataService: DataService
  ) { }

  private setButtonReady() {
    this.isLoading = false;
    this.icon = 'boat';
  }

  /**
   * Show all the boats returned by the service
   */
  private showBoatList() {
    if (this.isLoading === false) {
      this.navCtrl.push(BoatList, { 'boats': this.boats })
    }
  }

}
