import { Component, OnInit } from '@angular/core';
import { LoadingsService } from 'src/app/services/loadings.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-filmes-favoritos',
  templateUrl: './filmes-favoritos.page.html',
  styleUrls: ['./filmes-favoritos.page.scss']
})
export class FilmesFavoritosPage implements OnInit {

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
    this.buscaFilmesFavoritos();
  }

  /**
   * Busca filmes favoritos
   */
  buscaFilmesFavoritos() {
    var usuario = this.authService.getUsuarioStorage();
    var arr = JSON.parse(localStorage.getItem('filmesFavoritos'));
    var favoritos = [];

    if (arr){
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
