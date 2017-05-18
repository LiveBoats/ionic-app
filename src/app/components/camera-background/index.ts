import { Component } from '@angular/core';

import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {
  CameraPreview,
  CameraPreviewOptions,
} from '@ionic-native/camera-preview';

@Component({
  templateUrl: './template.html',
  providers: [
    CameraPreview,
    StatusBar,
    SplashScreen
  ]
})
export class CameraBackground {
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

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    cameraPreview: CameraPreview
  ) {
    platform.ready().then(() => {

      cameraPreview.startCamera(this.cameraPreviewOpts).then(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        });

      statusBar.hide();
      splashScreen.hide();
    });
  }
}

