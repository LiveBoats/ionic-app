import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {
  CameraPreview,
  CameraPreviewOptions,
} from '@ionic-native/camera-preview';

import { DataService } from "../../providers/api.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ DataService ]
})
export class HomePage {

  private cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'rear',
    tapPhoto: false,
    previewDrag: false,
    toBack: true,
    alpha: 1
  };

  constructor(
    private navCtrl: NavController,
    private dataService : DataService,
    private cameraPreview: CameraPreview) {

    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });
    //this.dataService.getVesselBaseFromMmsi("308095000").subscribe(value => console.log(value))
  }
}
