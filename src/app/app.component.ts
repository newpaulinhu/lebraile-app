import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from "../pages/home/home";
import { LivrosPage } from "../pages/livros/livros";
import { EquipamentosPage } from "../pages/equipamentos/equipamentos";
import { TraducaoPage } from "../pages/traducao/traducao";

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  transparente = "transparentBody";

  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Tradução', component: TraducaoPage, icon: 'analytics'},
      {title: 'Equipamentos', component: EquipamentosPage, icon: 'finger-print'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.keyboard.disableScroll(true);
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.nav.setRoot(HomePage);
  }

}
