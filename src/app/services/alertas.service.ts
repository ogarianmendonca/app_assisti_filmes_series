import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(private alertController: AlertController) { }

  showAlert(mensagem: string) {
    this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      message: mensagem,
      buttons: ['FECHAR']
    }).then(resp => {
      resp.present();
    });
  }

  showDetalhesEp(titulo: string, descricao: string) {
    this.alertController.create({
      cssClass: 'my-custom-class',
      header: titulo,
      message: descricao,
      buttons: ['FECHAR']
    }).then(resp => {
      resp.present();
    });
  }
}
