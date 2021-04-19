import { Component, OnInit } from '@angular/core';
import { LoadingsService } from 'src/app/services/loadings.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-seriados-favoritos',
  templateUrl: './seriados-favoritos.page.html',
  styleUrls: ['./seriados-favoritos.page.scss']
})
export class SeriadosFavoritosPage implements OnInit {

  public urlImagens = 'https://image.tmdb.org/t/p/w500';
  public favoritos: any;

  constructor(
    private loadingsService: LoadingsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadingsService.showLoading();
    this.buscaSeriadosFavoritos();
  }

  buscaSeriadosFavoritos() {
    var usuario = this.authService.getUsuarioStorage();
    var arr = JSON.parse(localStorage.getItem('seriadosFavoritos'));
    var favoritos = [];

    if (arr) {
      for (var i = 0; i < arr.length; i++) {
        if (usuario.id == arr[i].usuarioId) {
          favoritos.push(arr[i]);
        }
      }
    }

    this.favoritos = favoritos;
    this.loadingsService.hideLoading();
  }
}
