import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { Storage } from "@ionic/storage";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';

import {MyApp} from "./app.component";

import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/throw";

import {SettingsPage} from "../pages/settings/settings";
import {HomePage} from "../pages/home/home";

//Paginas do Lebraile
import {TraducaoPage} from "../pages/traducao/traducao";
import {LivrosPage} from "../pages/livros/livros";
import {EquipamentosPage} from "../pages/equipamentos/equipamentos";
import { EquipamentoServiceProvider } from '../providers/equipamento-service/equipamento-service';


export function provedorStorage() {
  return new Storage({
    name: "lebraile",
    storeName: "localData",
    driverOrder: ["indexeddb", "sqlite"]
  });
}

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    HomePage,
    LivrosPage,
    EquipamentosPage,
    TraducaoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    HomePage,
    LivrosPage,
    EquipamentosPage,
    TraducaoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: Storage, useFactory: provedorStorage },
    BarcodeScanner,
    Toast,
    EquipamentoServiceProvider
  ]
})

export class AppModule {
}
