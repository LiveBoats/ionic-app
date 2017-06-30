import { Component } from '@angular/core';

import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview';

import { LandingPage } from "../../../pages/landing-page/landing-page.component";

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [
    CameraPreview,
    StatusBar,
    SplashScreen
  ]
})
export class CameraBackground {
  rootPage = LandingPage;

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
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    cameraPreview: CameraPreview,
  ) {

    cameraPreview.startCamera(this.cameraPreviewOpts)
      .then(res => {
        console.log(res);
      },
      err => {
        console.log(err);
      },
    );

    platform.ready().then(() => {
      // starting the camera before platform ready to avoid white screen
      statusBar.hide();
      splashScreen.hide();
    });
  }
}

