import { Component, OnInit } from '@angular/core';
import { ActionSheet, ActionSheetController, NavController } from 'ionic-angular';
import { ActionSheetButton } from 'ionic-angular/components/action-sheet/action-sheet-options';

import { Boat }        from '../../app/models/boat';
import { BoatList }    from '../boat-list/boat-list.component';
import { BoatDetails } from '../boat-details/boat-details.component';
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
   * pop up menu to display boats in sight
   */
  private actionSheet: ActionSheet;

  /**
   * Generated list of buttons
   */
  private actionSheetButtons : Array<ActionSheetButton> = [];

  ngOnInit(): void {
    this.dataService.getBoats().subscribe(
      boats => {
        this.boats = boats;
        console.log("ready")
      },
      error => console.log(error)
    )
  }

  constructor(
    private navCtrl: NavController,
    private actionSheetController: ActionSheetController,
    private dataService: DataService
  ) { }

  /**
   * Show all the boats returned by the service
   */
  private showBoatList() {
    this.navCtrl.push(BoatList, {'boats': this.boats})
  }

}
