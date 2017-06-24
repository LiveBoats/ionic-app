import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser'

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CameraBackground } from './components/camera-background/index';
import { DataService } from './providers/api.service';

import { LandingPage } from '../pages/landing-page/landing-page.component';
import { BoatDetails } from '../pages/boat-details/boat-details.component';
import { BoatList } from '../pages/boat-list/boat-list.component';

@NgModule({
  declarations: [
    CameraBackground,
    LandingPage,
    BoatDetails,
    BoatList
  ],
  imports: [
    IonicModule.forRoot(CameraBackground),
    BrowserModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CameraBackground,
    LandingPage,
    BoatDetails,
    BoatList
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService
  ]
})
export class AppModule {}
