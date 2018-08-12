import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Toast } from "@ionic-native/toast";
import {
  QRScanner,
  QRScannerStatus
} from "../../../node_modules/@ionic-native/qr-scanner";
import { EquipamentoServiceProvider } from "../../providers/equipamento-service/equipamento-service";
import { Equipamento } from "./../../models/equipamento/equipamento";

@Component({
  selector: "page-camera",
  templateUrl: "camera.html"
})
export class CameraPage {
  private equipamentos: Array<Equipamento>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private qrScanner: QRScanner,
    private toast: Toast,
    private equipamentoService: EquipamentoServiceProvider
  ) {
    this.equipamentos = this.navParams.get("equipamentos");
  }

  ionViewDidLoad() {
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          let scanSub = this.qrScanner.scan().subscribe(
            qrCodeRead => {
              this.equipamentoService
                .getEquipamento(qrCodeRead)
                .subscribe(equipt => {
                  if (equipt) {
                    this.toast
                      .show(`Equipamento Já Cadastrado`, "5000", "center")
                      .subscribe();
                  } else {
                    this.equipamentoService.salvarEquipamento(
                      new Equipamento(
                        qrCodeRead,
                        "Equipamento do Paulo",
                        100,
                        100
                      )
                    );
                    this.equipamentoService
                      .listarEquipamentos()
                      .subscribe(equipamento => {
                        this.equipamentos = equipamento;
                      });
                    this.toast
                      .show(
                        `Equipamento Cadastrado com Sucesso`,
                        "5000",
                        "center"
                      )
                      .subscribe();
                  }
                });
              this.qrScanner.hide();
              scanSub.unsubscribe();
              this.navCtrl.pop();
            },
            err => {
              this.toast.show(err, "5000", "center").subscribe();
              this.navCtrl.pop();
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
          this.navCtrl.pop();
        }
      })
      .catch((e: any) => {
        //TODO tratamento de erro para acessar a camera
        console.log("Error is", e);
        this.navCtrl.pop();
      });
  }
}
