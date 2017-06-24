import { BoatDetails } from '../boat-details/boat-details.component';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Boat } from '../../app/models/boat';

@Component({
  selector: 'boat-list',
  templateUrl: './template.html'
})
export class BoatList implements OnInit {
  private boats: Array<Boat>;

  constructor(
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private navParams: NavParams
  ) { }

  ngOnInit(): void {
    this.boats = this.navParams.get('boats');
  }

  /**
   * Navigate to the details page
   * @param boat Boat that will be displayed on screen
   */
  private openDetails(boat: Boat) {
    this.navCtrl.push(BoatDetails, {'boat': boat});
  }

  /**
   * Close the list
   */
  private dismiss() {
    this.viewCtrl.dismiss();
  }
}
