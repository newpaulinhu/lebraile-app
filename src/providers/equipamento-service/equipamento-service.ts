import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { Equipamento } from "./../../models/equipamento/equipamento";

/*
  Generated class for the EquipamentoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EquipamentoServiceProvider {

  constructor(
    private _storage: Storage,
    private _http: HttpClient
  ) {}

  public salvarEquipamento(equipamento: Equipamento) {
    this._storage.set(equipamento.id, equipamento);
  }


  public listarEquipamentos() {
    let arr = [];
    return this._storage.forEach((v, k, i) => {
        if (k.indexOf('LEBRAILE') !== -1)
          arr.push(v);
      }).then(() => {
        return arr;
      });
  }

  public getEquipamento(id: string){
    return Observable.fromPromise(this._storage
      .get(id)
      .then((itens: Equipamento[]) => {
        console.log(itens);
        itens = itens ? itens : new Array<Equipamento>();
        return itens;
    }));
  }
  
}
