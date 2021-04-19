import { Component, OnInit } from '@angular/core';
import { LoadingsService } from 'src/app/services/loadings.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-filmes-assistidos',
  templateUrl: './filmes-assistidos.page.html',
  styleUrls: ['./filmes-assistidos.page.scss']
})
export class FilmesAssistidosPage implements OnInit {

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
    this.buscaFilmesAssistidos();
  }

  buscaFilmesAssistidos() {
    var usuario = this.authService.getUsuarioStorage();
    var arr = JSON.parse(localStorage.getItem('filmesVisualizados'));
    var assistidos = [];

    if (arr){
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
