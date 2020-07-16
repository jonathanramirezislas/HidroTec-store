import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { ImageModalPageModule } from './image-modal/image-modal.module';

//import { IonicImageViewerModule } from 'ionic-img-viewer';


import{ HttpClientModule} from '@angular/common/http'


// validation forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//import { IonicRatingModule } from 'ionic-rating';
import { IonicRatingModule } from 'ionic4-rating';

import { Network } from '@ionic-native/network/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

//sensor de huella digital
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';
//call
import { CallNumber } from '@ionic-native/call-number/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,HttpClientModule,IonicModule.forRoot(),AppRoutingModule,IonicRatingModule,ImageModalPageModule,FormsModule,ReactiveFormsModule],
  providers: [
    StatusBar,
    SQLite,
    Network,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AndroidFingerprintAuth,
    CallNumber
  ],
  bootstrap: [AppComponent]
})
export class AppModule {









}
