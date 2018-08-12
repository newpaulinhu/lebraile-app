import { Component } from '@angular/core';
import { Toast } from "@ionic-native/toast";
import {NavController} from "ionic-angular";
import {EquipamentosPage} from "../equipamentos/equipamentos";
import { EquipamentoServiceProvider } from "../../providers/equipamento-service/equipamento-service";

import { HttpClient } from '@angular/common/http';
import { LetraTraduzida } from './letra-traduzida';
import 'rxjs/add/operator/map';
import { Equipamento } from '../../models/equipamento/equipamento';

@Component({
  selector: 'traducao',
  templateUrl: 'traducao.html'
})
export class TraducaoPage {

  textoTraducao: string;
  timeoutMS = 10000;


  constructor(public http: HttpClient, 
              public nav: NavController,
              private toast: Toast,
              private equipamentoService: EquipamentoServiceProvider) {}

   // choose place
  cadastrarEquipamento(from) {
    this.nav.push(EquipamentosPage, from);
  }

  traduzir(){
    
    let letraTraducao = this.textoTraducao.substr(this.textoTraducao.length - 1);
    return new Promise(resolve => {
      this.http.get<LetraTraduzida>(`http://lebraile.herokuapp.com/lebraile/tradutora/letra?letra=${letraTraducao}`).subscribe(data => {
        this.enviarParaDevice(data);
      }, err => {
        console.log(err);
        this.toast.show(`Erro chamada para a tradutora`, "5000", "center").subscribe();
      });
    });
  }

  enviarParaDevice(letraTraduzida :LetraTraduzida){
    this.equipamentoService.listarEquipamentos().subscribe(equipamentos => {
      equipamentos.forEach( equipamento => {
        console.log(`Chamando Equipamento ${equipamento.id} para a letra: ${letraTraduzida.caractere} -  ${letraTraduzida.braille}`);
        let path = `http://${equipamento.id}/braille/?pin=${letraTraduzida.braille}&tempo=300`;
        return new Promise(resolve => {
          this.http.get(path).subscribe(data => {
          }, err => {
            console.log(err);
            this.toast.show(`Erro ao Enviar para o equipamento ${equipamento.id}`, "5000", "center").subscribe();
          });
        });
      })
    });



  }
}
