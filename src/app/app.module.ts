import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ChatPage } from '../pages/chat/chat';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import {HttpModule} from "@angular/http";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireModule} from "angularfire2";
import {SocketIoModule, SocketIoConfig} from "ng-socket-io";

const config: SocketIoConfig = { url: 'http://172.31.50.172:3001', options: {}};

const firebaseConfig = {
  apiKey: "AIzaSyAL-wPf3Zl5NEKUr9HJ74M1QRIQLLvrnog",
  authDomain: "notes-5eef4.firebaseapp.com",
  databaseURL: "https://notes-5eef4.firebaseio.com",
  projectId: "notes-5eef4",
  storageBucket: "notes-5eef4.appspot.com",
  messagingSenderId: "134800606480"
};
@NgModule({
  declarations: [
    MyApp,
    ChatPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    HttpModule,
    SocketIoModule.forRoot(config),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider
  ]
})
export class AppModule {}
