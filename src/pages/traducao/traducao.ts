import { Component } from '@angular/core';
import { Toast } from "@ionic-native/toast";
import {NavController} from "ionic-angular";
import {EquipamentosPage} from "../equipamentos/equipamentos";
import { EquipamentoServiceProvider } from "../../providers/equipamento-service/equipamento-service";

import { HttpClient } from '@angular/common/http';
import { LetraTraduzida } from './letra-traduzida';
import 'rxjs/add/operator/map';
import { Equipamento } from '../../models/equipamento/equipamento';
import { TradutoraServiceProvider } from '../../providers/tradutora-service/tradutora-service';

@Component({
  selector: 'traducao',
  templateUrl: 'traducao.html'
})
export class TraducaoPage {

  public letrasTraduzidas = new Array<LetraTraduzida>();
  textoTraducao: string;
  timeoutMS = 10000;


  constructor(public http: HttpClient, 
              public nav: NavController,
              private toast: Toast,
              private equipamentoService: EquipamentoServiceProvider,
              private tradutoraService: TradutoraServiceProvider) {}

   // choose place
  cadastrarEquipamento(from) {
    this.nav.push(EquipamentosPage, from);
  }

  traduzir(){
    let letraTraducao = this.textoTraducao.substr(this.textoTraducao.length - 1);
    this.tradutoraService.traduzirLetra(letraTraducao).subscribe( data => {
      this.enviarParaDevice(data);
      this.letrasTraduzidas.push(data);
    }, err => {
      this.toast.show(`Erro chamada para a tradutora`, "5000", "center").subscribe();
    });
  }

  enviarParaDevice(letraTraduzida :LetraTraduzida){
    this.equipamentoService.listarEquipamentos().subscribe(equipamentos => {
      equipamentos.forEach( equipamento => {
        console.log(`Chamando Equipamento ${equipamento.ip} para a letra: ${letraTraduzida.caractere}( ${letraTraduzida.braile} )`);
        this.equipamentoService.enviarLetraParaEquipamento(equipamento, letraTraduzida).subscribe( ret => {
        });
      });
    });
  }
}
