import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { EquipamentoServiceProvider } from '../../providers/equipamento-service/equipamento-service';

import { Equipamento } from "./../../models/equipamento/equipamento";


/**
 * Generated class for the EquipamentosPage component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'equipamentos',
  templateUrl: 'equipamentos.html'
})
export class EquipamentosPage {
  
  equipamentos: any[];

  constructor(
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    private equipamentoService: EquipamentoServiceProvider) {
      this.equipamentoService.listarEquipamentos().then((equipamento : Equipamento[]) => {
        this.equipamentos = <Equipamento[]> equipamento;
      });
  }


  adicionarEquipamento(){
    this.barcodeScanner.scan().then((barcodeData) => {
      let equipamentoSelecionado = this.equipamentoService.getEquipamento(barcodeData.text);
      console.log('Equipamento Cadastrado: ');
      console.log(equipamentoSelecionado);
      if(equipamentoSelecionado !== undefined) {
        this.toast.show(`Equipamento Já Cadastrado`, '5000', 'center').subscribe();
      } else {
        this.equipamentoService.salvarEquipamento(new Equipamento(barcodeData.text, "Equipamento do Paulo", 100, 100));
        this.equipamentoService.listarEquipamentos().then((equipamento : Equipamento[]) => {
          this.equipamentos = <Equipamento[]> equipamento;
        });
        this.toast.show(`Equipamento Cadastrado com Sucesso`, '5000', 'center').subscribe();
      }
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe();
    });
  }
}
