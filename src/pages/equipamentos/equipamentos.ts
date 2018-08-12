import { CameraPage } from './../camera/camera';
import { NavController } from 'ionic-angular';
import { Component } from "@angular/core";

import { EquipamentoServiceProvider } from "../../providers/equipamento-service/equipamento-service";

import { Equipamento } from "./../../models/equipamento/equipamento";

@Component({
  selector: "equipamentos",
  templateUrl: "equipamentos.html"
})
export class EquipamentosPage {

  equipamentos = new Array<Equipamento>();

  constructor(
    private navCtrl: NavController,
    private equipamentoService: EquipamentoServiceProvider
  ) {
    this.equipamentoService
      .listarEquipamentos().subscribe(equipamento => {
        this.equipamentos = equipamento;
      });
  }

  adicionarEquipamento() {
    this.navCtrl.push(CameraPage, {equipamentos: this.equipamentos})
  }
}
