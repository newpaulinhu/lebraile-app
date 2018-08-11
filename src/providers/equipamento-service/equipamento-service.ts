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
    this.listarEquipamentos().subscribe((equipamentos: Equipamento[]) => {
      equipamentos.push(equipamento);
      this._storage.set('equipamentos', equipamentos);
    });
  }


  public listarEquipamentos(): Observable<Equipamento[]> {
    return Observable.fromPromise(this._storage
      .get("equipamentos")
      .then((equipamentos: Equipamento[]) => {
        return equipamentos;
    }));
  }

  public getEquipamento(id: string){
    return Observable.fromPromise(this._storage
      .get(id)
      .then((item: Equipamento) => {
        return item;
    }));
  }
  
}
