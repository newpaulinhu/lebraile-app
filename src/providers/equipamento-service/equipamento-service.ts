import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { Equipamento } from "./../../models/equipamento/equipamento";
import { LetraTraduzida } from '../../pages/traducao/letra-traduzida';

/*
  Generated class for the EquipamentoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EquipamentoServiceProvider {
  private readonly apiRoot = 'https://lebraile-api.herokuapp.com/lebraile-web';
  constructor(
    private _storage: Storage,
    private _http: HttpClient
  ) {}

  public salvarEquipamento(equipamento: Equipamento) {
    this.listarEquipamentos().subscribe((equipamentos: Array<Equipamento>) => {
      equipamentos.push(equipamento);
      this._storage.set('equipamentos', equipamentos);
    });

    this._http.post<Equipamento>(`${this.apiRoot}/equipamento`, equipamento);
  }


  public listarEquipamentos(): Observable<Array<Equipamento>> {
    return Observable.fromPromise(this._storage
      .get("equipamentos")
      .then((equipamentos: Array<Equipamento>) => {
        return equipamentos ? equipamentos : new Array<Equipamento>() ;
    }));
  }

  public getEquipamento(ip: string): Observable<Equipamento>{
    return Observable.fromPromise(this._storage
      .get("equipamentos")
      .then((equipamentos: Array<Equipamento>) => {
        return equipamentos ? equipamentos.find(eqp => eqp.ip === ip) : null;
    }));
  }
  

  removerEquipamento(idEquipamento: number) {
    this._http.delete<any>(`${this.apiRoot}/equipamento/${idEquipamento}`);
  }

  listarEquipamentosWeb(): Observable<Array<Equipamento>> {
    return this._http.get<Array<Equipamento>>(`${this.apiRoot}/equipamento`);
  }

  enviarLetraParaEquipamento(equipamento: Equipamento, letra: LetraTraduzida){
    return this._http.get(`${equipamento.ip}/braille/?pin=${letra.braile}&tempo=${equipamento.tempoCaractere}`);
  }
}
