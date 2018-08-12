import { Component } from "@angular/core";
import { Toast } from "@ionic-native/toast";
import { EquipamentoServiceProvider } from "../../providers/equipamento-service/equipamento-service";

import { Equipamento } from "./../../models/equipamento/equipamento";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner";
import { finalize } from "rxjs/operators";

@Component({
  selector: "equipamentos",
  templateUrl: "equipamentos.html"
})
export class EquipamentosPage {

  equipamentos = new Array<Equipamento>();

  constructor(
    private qrScanner: QRScanner,
    private toast: Toast,
    private equipamentoService: EquipamentoServiceProvider
  ) {
    this.equipamentoService
      .listarEquipamentos().subscribe(equipamento => {
        this.equipamentos = equipamento;
      });
  }

  adicionarEquipamento() {
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
        if (status.authorized) {
          let scanSub = this.qrScanner.scan().subscribe(qrCodeRead => {
              this.equipamentoService.getEquipamento(qrCodeRead).subscribe(equipt => {
                if (equipt) {
                  this.toast.show(`Equipamento Já Cadastrado`, "5000", "center").subscribe();
                } else {

                  this.equipamentoService.salvarEquipamento(
                    new Equipamento(qrCodeRead, "Equipamento do Paulo", 100, 100)
                  );
                  this.equipamentoService.listarEquipamentos().subscribe(equipamento => {
                      this.equipamentos = equipamento;
                    });
                  this.toast.show(`Equipamento Cadastrado com Sucesso`, "5000", "center").subscribe();
                }
              });
              this.qrScanner.hide();
              scanSub.unsubscribe();
            },
            err => {
              this.toast.show(err, "5000", "center").subscribe();
            }
          );

          this.qrScanner.resumePreview();

          this.qrScanner.show().then(
            (data: QRScannerStatus) => {
              console.log("datashowing", data.showing);
            },
            err => {
              console.log("erro ao mostrar QR scanner");
            }
          );
        } else if (status.denied) {
          //TODO tratamento quand usuário nega o acesso
          console.log("acesso negado");
        }
      })
      .catch((e: any) => {
        //TODO tratamento de erro para acessar a camera
        console.log("Error is", e);
      });
  }
}
