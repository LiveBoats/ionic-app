import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CameraBackground } from './components/camera-background/index';
import { DataService } from './providers/api.service';

@NgModule({
  declarations: [
    CameraBackground,
  ],
  imports: [
    IonicModule.forRoot(CameraBackground),
    BrowserModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CameraBackground
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService
  ]
})
export class AppModule {}
