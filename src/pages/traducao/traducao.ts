import { Component } from '@angular/core';
import {NavController} from "ionic-angular";

import {EquipamentosPage} from "../equipamentos/equipamentos";

import { HttpClient } from '@angular/common/http';
import { LetraTraduzida } from './letra-traduzida';
import 'rxjs/add/operator/map';

@Component({
  selector: 'traducao',
  templateUrl: 'traducao.html'
})
export class TraducaoPage {

  textoTraducao: string;
  timeoutMS = 10000;


  constructor(public http: HttpClient, public nav: NavController) {}

   // choose place
  cadastrarEquipamento(from) {
    this.nav.push(EquipamentosPage, from);
  }

  traduzir(){
    
    let letraTraducao = this.textoTraducao.substr(this.textoTraducao.length - 1);
    return new Promise(resolve => {
      this.http.get<LetraTraduzida>(`http://lebraile.herokuapp.com/lebraile/tradutora/letra?letra=${letraTraducao}`).subscribe(data => {
        console.log(data);
        this.enviarParaDevice(data);
      }, err => {
        console.log(err);
        console.log('Erro na Tradução');
      });
    });
  }

  enviarParaDevice(letraTraduzida :LetraTraduzida){
    let deviceID = '192.168.1.1';
    console.log(`Chamando Equipamento ${deviceID} para a letra: ${letraTraduzida.caractere} -  ${letraTraduzida.braille}`);
    let path = `http://${deviceID}/braille/?pin=${letraTraduzida.braille}&tempo=300`;
    return new Promise(resolve => {
      this.http.get(path).subscribe(data => {
      }, err => {
        console.log(err);
        console.log('Erro ao enviar para o lebraile');
      });
    });

  }
}
