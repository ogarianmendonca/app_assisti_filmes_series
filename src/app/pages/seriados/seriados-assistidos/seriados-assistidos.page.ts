import { Component, OnInit } from '@angular/core';
import { LoadingsService } from 'src/app/services/loadings.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-seriados-assistidos',
  templateUrl: './seriados-assistidos.page.html',
  styleUrls: ['./seriados-assistidos.page.scss']
})
export class SeriadosAssistidosPage implements OnInit {

  public urlImagens = "https://image.tmdb.org/t/p/w500";
  public assistidos: any;

  constructor(
    private loadingsService: LoadingsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadingsService.showLoading();
    this.buscaSeriadosAssistidos();
  }

  buscaSeriadosAssistidos() {
    var usuario = this.authService.getUsuarioStorage();
    var arr = JSON.parse(localStorage.getItem('seriadosVisualizados'));
    var assistidos = [];

    if (arr) {
      for (var i = 0; i < arr.length; i++) {
        if (usuario.id == arr[i].usuarioId) {
          assistidos.push(arr[i]);
        }
      }
    }

    this.assistidos = assistidos;
    this.loadingsService.hideLoading();
  }
}
