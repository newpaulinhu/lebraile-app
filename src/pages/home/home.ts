import {Component} from "@angular/core";
import {NavController, PopoverController} from "ionic-angular";

import {SettingsPage} from "../settings/settings";
import {TraducaoPage} from "../traducao/traducao";
import {EquipamentosPage} from "../equipamentos/equipamentos";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  
  constructor(public nav: NavController, public popoverCtrl: PopoverController) {
  }
  // choose place
  traduzir(from) {
    this.nav.push(TraducaoPage, from);
  }

  // choose place
  cadastrarEquipamento(from) {
    this.nav.push(EquipamentosPage, from);
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }
}

//
