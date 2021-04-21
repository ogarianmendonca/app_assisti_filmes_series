import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public usuario =  this.authService.getUsuarioStorage();

  constructor(
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {
  }
  
  ionViewDidEnter(){
    var cienteSalvDados = localStorage.getItem('ciente');

    if (!cienteSalvDados) {
      this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Atenção!',
        message: "Informações de filmes e seriados adicionados como favoritos ou assitidos serão salvos em seu aparelho.",
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              localStorage.setItem('ciente', 'true');
            }
          }
        ]
      }).then(resp => {
        resp.present();
      });
    }
  }
}
