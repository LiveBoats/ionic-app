import { Component } from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    ViewController
} from 'ionic-angular';

import { Boat } from '../../app/models/boat';

@Component({
  selector: 'boat-details',
  templateUrl: './template.html'
})
export class BoatDetails {
  private boat: Boat;

  constructor(
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private navParams: NavParams
  ) { }

  ngOnInit(): void {
    this.boat = this.navParams.get('boat');
  }

  private dismiss() {
    this.viewCtrl.dismiss();
  }
}
