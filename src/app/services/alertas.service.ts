import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(private alertController: AlertController) { }

  /**
   * Mostra alerta com mensagem
   */
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

  /**
   * Mostra detalhes episódios de seriados
   */
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
