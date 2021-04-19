import { AuthService } from '../../../services/auth.service';
import { LoadingsService } from '../../../services/loadings.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeriadosService } from 'src/app/services/seriados.service';

@Component({
  selector: 'app-visualizar-seriado',
  templateUrl: './visualizar-seriado.page.html',
  styleUrls: ['./visualizar-seriado.page.scss']
})
export class VisualizarSeriadoPage implements OnInit {

  public urlImagens = 'https://image.tmdb.org/t/p/w500';
  public seriado: any;
  public favoritos: any;
  public likes: any;
  public deslikes: any;
  public visualizados: any;
  public usuario = this.authService.getUsuarioStorage();

  constructor(private seriadosService: SeriadosService,
              private loadingsService: LoadingsService,
              private routerActivated: ActivatedRoute,
              private authService: AuthService
  ) { }

  ngOnInit() {
    this.buscarSeriadoSelecionado();
    this.buscaFavorito();
    this.buscarLike();
    this.buscarDeslike();
    this.buscaVisualizados();
  }

  buscarSeriadoSelecionado() {
    this.loadingsService.showLoading();
    var id = this.routerActivated.snapshot.params['id'];

    this.seriadosService.buscarSeriadoSelecionado(id)
      .subscribe((resp: any) => {
        this.seriado = resp;
        this.loadingsService.hideLoading();
      });
  }

  addFavorito(id, titulo, poster) {
    var novoFavorito = [];

    if (localStorage.getItem('seriadosFavoritos')) {
      var arr = JSON.parse(localStorage.getItem('seriadosFavoritos'));
      for (var i = 0; i < arr.length; i++) {
        novoFavorito.push(arr[i]);
      }

      novoFavorito.push({
        "usuarioId": this.usuario.id,
        "titulo": titulo,
        "seriadoId": id,
        "poster": poster
      });

      localStorage.setItem('seriadosFavoritos', JSON.stringify(novoFavorito));
      this.buscaFavorito();
    } else {
      novoFavorito.push({
        "usuarioId": this.usuario.id,
        "titulo": titulo,
        "seriadoId": id,
        "poster": poster
      });

      localStorage.setItem('seriadosFavoritos', JSON.stringify(novoFavorito));
      this.buscaFavorito();
    }
  }

  buscaFavorito() {
    if (localStorage.getItem('seriadosFavoritos')) {
      var id = this.routerActivated.snapshot.params['id'];
      var arr = JSON.parse(localStorage.getItem('seriadosFavoritos'));

      if (arr.length) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].seriadoId == id && arr[i].usuarioId == this.usuario.id) {
            this.favoritos = [arr[i]];
            break;
          } else {
            this.favoritos = [{"seriadoId": "x"}];
          }
        }
      } else {
        this.favoritos = [{"seriadoId": "x"}];
      }
    } else {
      this.favoritos = [{"seriadoId": "x"}];
    }
  }

  removeFavorito(id) {
    var arr = JSON.parse(localStorage.getItem('seriadosFavoritos'));
    var novoFavorito = [];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].seriadoId != id) {
        novoFavorito.push(arr[i]);
      } else if (arr[i].seriadoId == id && arr[i].usuarioId != this.usuario.id) {
        novoFavorito.push(arr[i]);
      }
    }

    localStorage.removeItem('seriadosFavoritos');
    localStorage.setItem('seriadosFavoritos', JSON.stringify(novoFavorito));
    this.buscaFavorito();
  }

  addLike(id, titulo) {
    var novoLike = [];

    if (localStorage.getItem('likesSeriados')) {
      var arr = JSON.parse(localStorage.getItem('likesSeriados'));
      for (var i = 0; i < arr.length; i++) {
        novoLike.push(arr[i]);
      }

      novoLike.push({
        "usuarioId": this.usuario.id,
        "titulo": titulo,
        "seriadoId": id
      });

      localStorage.setItem('likesSeriados', JSON.stringify(novoLike));
      this.removeDeslike(id);
      this.buscarLike();
    } else {
      novoLike.push({
        "usuarioId": this.usuario.id,
        "titulo": titulo,
        "seriadoId": id
      });

      localStorage.setItem('likesSeriados', JSON.stringify(novoLike));
      this.removeDeslike(id);
      this.buscarLike();
    }
  }

  buscarLike() {
    if (localStorage.getItem('likesSeriados')) {
      var id = this.routerActivated.snapshot.params['id'];
      var arr = JSON.parse(localStorage.getItem('likesSeriados'));

      if (arr.length) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].seriadoId == id && arr[i].usuarioId == this.usuario.id) {
            this.likes = [arr[i]];
            break;
          } else {
            this.likes = [{"seriadoId": "x"}];
          }
        }
      } else {
        this.likes = [{"seriadoId": "x"}];
      }
    } else {
      this.likes = [{"seriadoId": "x"}];
    }
  }

  removeLike(id) {
    if (localStorage.getItem('likesSeriados')) {
      var arr = JSON.parse(localStorage.getItem('likesSeriados'));
      var novoLike = [];

      for (var i = 0; i < arr.length; i++) {
        if (arr[i].seriadoId != id) {
          novoLike.push(arr[i]);
        } else if (arr[i].seriadoId == id && arr[i].usuarioId != this.usuario.id) {
          novoLike.push(arr[i]);
        }
      }

      localStorage.removeItem('likesSeriados');
      localStorage.setItem('likesSeriados', JSON.stringify(novoLike));
    }
    this.buscarLike();
  }

  addDeslike(id, titulo) {
    var novoDeslike = [];

    if (localStorage.getItem('deslikesSeriados')) {
      var arr = JSON.parse(localStorage.getItem('deslikesSeriados'));
      for (var i = 0; i < arr.length; i++) {
        novoDeslike.push(arr[i]);
      }

      novoDeslike.push({
        "usuarioId": this.usuario.id,
        "titulo": titulo,
        "seriadoId": id
      });

      localStorage.setItem('deslikesSeriados', JSON.stringify(novoDeslike));
      this.removeLike(id);
      this.buscarDeslike();
    } else {
      novoDeslike.push({
        "usuarioId": this.usuario.id,
        "titulo": titulo,
        "seriadoId": id
      });

      localStorage.setItem('deslikesSeriados', JSON.stringify(novoDeslike));
      this.removeLike(id);
      this.buscarDeslike();
    }
  }

  buscarDeslike() {
    if (localStorage.getItem('deslikesSeriados')) {
      var id = this.routerActivated.snapshot.params['id'];
      var arr = JSON.parse(localStorage.getItem('deslikesSeriados'));

      if (arr.length) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].seriadoId == id && arr[i].usuarioId == this.usuario.id) {
            this.deslikes = [arr[i]];
            break;
          } else {
            this.deslikes = [{"seriadoId": "x"}];
          }
        }
      } else {
        this.deslikes = [{"seriadoId": "x"}];
      }
    } else {
      this.deslikes = [{"seriadoId": "x"}];
    }
  }

  removeDeslike(id) {
    if (localStorage.getItem('deslikesSeriados')) {
      var arr = JSON.parse(localStorage.getItem('deslikesSeriados'));
      var novoDeslike = [];

      for (var i = 0; i < arr.length; i++) {
        if (arr[i].seriadoId != id) {
          novoDeslike.push(arr[i]);
        } else if (arr[i].seriadoId == id && arr[i].usuarioId != this.usuario.id) {
          novoDeslike.push(arr[i]);
        }
      }

      localStorage.removeItem('deslikesSeriados');
      localStorage.setItem('deslikesSeriados', JSON.stringify(novoDeslike));
    }

    this.buscarDeslike();
  }

  addVisualizado(id, titulo, poster) {
    var novoVisualizado = [];

    if (localStorage.getItem('seriadosVisualizados')) {
      var arr = JSON.parse(localStorage.getItem('seriadosVisualizados'));
      for (var i = 0; i < arr.length; i++) {
        novoVisualizado.push(arr[i]);
      }

      novoVisualizado.push({
        "usuarioId": this.usuario.id,
        "titulo": titulo,
        "seriadoId": id,
        "poster": poster
      });

      localStorage.setItem('seriadosVisualizados', JSON.stringify(novoVisualizado));
      this.buscaVisualizados();
    } else {
      novoVisualizado.push({
        "usuarioId": this.usuario.id,
        "titulo": titulo,
        "seriadoId": id,
        "poster": poster
      });

      localStorage.setItem('seriadosVisualizados', JSON.stringify(novoVisualizado));
      this.buscaVisualizados();
    }
  }

  buscaVisualizados() {
    if (localStorage.getItem('seriadosVisualizados')) {
      var id = this.routerActivated.snapshot.params['id'];
      var arr = JSON.parse(localStorage.getItem('seriadosVisualizados'));

      if (arr.length) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].seriadoId == id && arr[i].usuarioId == this.usuario.id) {
            this.visualizados = [arr[i]];
            break;
          } else {
            this.visualizados = [{"seriadoId": "x"}];
          }
        }
      } else {
        this.visualizados = [{"seriadoId": "x"}];
      }
    } else {
      this.visualizados = [{"seriadoId": "x"}];
    }
  }

  removeVisualizado(id) {
    var arr = JSON.parse(localStorage.getItem('seriadosVisualizados'));
    var novoVisualizado = [];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].seriadoId != id) {
        novoVisualizado.push(arr[i]);
      } else if (arr[i].seriadoId == id && arr[i].usuarioId != this.usuario.id) {
        novoVisualizado.push(arr[i]);
      }
    }

    localStorage.removeItem('seriadosVisualizados');
    localStorage.setItem('seriadosVisualizados', JSON.stringify(novoVisualizado));
    this.buscaVisualizados();
  }
}
