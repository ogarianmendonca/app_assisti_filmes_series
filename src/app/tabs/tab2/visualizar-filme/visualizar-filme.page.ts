import { AuthService } from '../../../services/auth.service';
import { LoadingsService } from '../../../services/loadings.service';
import { FilmesService } from 'src/app/services/filmes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visualizar-filme',
  templateUrl: './visualizar-filme.page.html',
  styleUrls: ['./visualizar-filme.page.scss']
})
export class VisualizarFilmePage implements OnInit {

  public urlImagens = 'https://image.tmdb.org/t/p/w500';
  public filme: any;
  public favoritos: any;
  public likes: any;
  public deslikes: any;
  public visualizados: any;
  public usuario = this.authService.getUsuarioStorage();

  constructor(private filmesService: FilmesService,
              private loadingsService: LoadingsService,
              private routerActivated: ActivatedRoute,
              private authService: AuthService
  ) { }

  ngOnInit() {
    this.buscarFilmeSelecionado();
    this.buscaFavorito();
    this.buscarLike();
    this.buscarDeslike();
    this.buscaVisualizados();
  }

  /**
   * Busca filme selecionado.
   */
  buscarFilmeSelecionado() {
    this.loadingsService.showLoading();
    var id = this.routerActivated.snapshot.params['id'];

    this.filmesService.buscarFilmeSelecionado(id)
      .subscribe((resp: any) => {
        this.filme = resp;
        this.loadingsService.hideLoading();
      });
  }

  /**
   * Adiciona aos favoritos
   * @param id
   * @param titulo
   * @param poster
   */
  addFavorito(id, titulo, poster) {
    var novoFavorito = [];

    if (localStorage.getItem('filmesFavoritos')) {
      var arr = JSON.parse(localStorage.getItem('filmesFavoritos'));
      for (var i = 0; i < arr.length; i++) {
        novoFavorito.push(arr[i]);
      }

      novoFavorito.push({
        "usuarioId": this.usuario.id,
        "titulo": titulo,
        "filmeId": id,
        "poster": poster
      });

      localStorage.setItem('filmesFavoritos', JSON.stringify(novoFavorito));
      this.buscaFavorito();
    } else {
      novoFavorito.push({
        "usuarioId": this.usuario.id,
        "titulo": titulo,
        "filmeId": id,
        "poster": poster
      });

      localStorage.setItem('filmesFavoritos', JSON.stringify(novoFavorito));
      this.buscaFavorito();
    }
  }

  /**
   * Busca favorito
   */
  buscaFavorito() {
    if (localStorage.getItem('filmesFavoritos')) {
      var id = this.routerActivated.snapshot.params['id'];
      var arr = JSON.parse(localStorage.getItem('filmesFavoritos'));

      if (arr.length) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].filmeId == id && arr[i].usuarioId == this.usuario.id) {
            this.favoritos = [arr[i]];
            break;
          } else {
            this.favoritos = [{"filmeId": "x"}];
          }
        }
      } else {
        this.favoritos = [{"filmeId": "x"}];
      }
    } else {
      this.favoritos = [{"filmeId": "x"}];
    }
  }

  /**
   * Remove favorito
   */
  removeFavorito(id) {
    var arr = JSON.parse(localStorage.getItem('filmesFavoritos'));
    var novoFavorito = [];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].filmeId != id) {
        novoFavorito.push(arr[i]);
      } else if (arr[i].filmeId == id && arr[i].usuarioId != this.usuario.id) {
        novoFavorito.push(arr[i]);
      }
    }

    localStorage.removeItem('filmesFavoritos');
    localStorage.setItem('filmesFavoritos', JSON.stringify(novoFavorito));
    this.buscaFavorito();
  }

  /**
   * Marca como "gostei"
   */
  addLike(id, titulo) {
    var novoLike = [];

    if (localStorage.getItem('likesFilmes')) {
      var arr = JSON.parse(localStorage.getItem('likesFilmes'));
      for (var i = 0; i < arr.length; i++) {
        novoLike.push(arr[i]);
      }

      novoLike.push({
        "usuarioId": this.usuario.id,
        "titulo": titulo,
        "filmeId": id
      });

      localStorage.setItem('likesFilmes', JSON.stringify(novoLike));
      this.removeDeslike(id);
      this.buscarLike();
    } else {
      novoLike.push({
        "usuarioId": this.usuario.id,
        "titulo": titulo,
        "filmeId": id
      });

      localStorage.setItem('likesFilmes', JSON.stringify(novoLike));
      this.removeDeslike(id);
      this.buscarLike();
    }
  }

  /**
   * Busca "gostei"
   */
  buscarLike() {
    if (localStorage.getItem('likesFilmes')) {
      var id = this.routerActivated.snapshot.params['id'];
      var arr = JSON.parse(localStorage.getItem('likesFilmes'));

      if (arr.length) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].filmeId == id && arr[i].usuarioId == this.usuario.id) {
            this.likes = [arr[i]];
            break;
          } else {
            this.likes = [{"filmeId": "x"}];
          }
        }
      } else {
        this.likes = [{"filmeId": "x"}];
      }
    } else {
      this.likes = [{"filmeId": "x"}];
    }
  }

  /**
   * Remove "gostei"
   */
  removeLike(id) {
    if (localStorage.getItem('likesFilmes')) {
      var arr = JSON.parse(localStorage.getItem('likesFilmes'));
      var novoLike = [];

      for (var i = 0; i < arr.length; i++) {
        if (arr[i].filmeId != id) {
          novoLike.push(arr[i]);
        } else if (arr[i].filmeId == id && arr[i].usuarioId != this.usuario.id) {
          novoLike.push(arr[i]);
        }
      }

      localStorage.removeItem('likesFilmes');
      localStorage.setItem('likesFilmes', JSON.stringify(novoLike));
    }
    this.buscarLike();
  }

  /**
   * Marca como "não gostei"
   */
  addDeslike(id, titulo) {
    var novoDeslike = [];

    if (localStorage.getItem('deslikesFilmes')) {
      var arr = JSON.parse(localStorage.getItem('deslikesFilmes'));
      for (var i = 0; i < arr.length; i++) {
        novoDeslike.push(arr[i]);
      }

      novoDeslike.push({
        "usuarioId": this.usuario.id,
        "titulo": titulo,
        "filmeId": id
      });

      localStorage.setItem('deslikesFilmes', JSON.stringify(novoDeslike));
      this.removeLike(id);
      this.buscarDeslike();
    } else {
      novoDeslike.push({
        "usuarioId": this.usuario.id,
        "titulo": titulo,
        "filmeId": id
      });

      localStorage.setItem('deslikesFilmes', JSON.stringify(novoDeslike));
      this.removeLike(id);
      this.buscarDeslike();
    }
  }

  /**
   * Busca "não gostei"
   */
  buscarDeslike() {
    if (localStorage.getItem('deslikesFilmes')) {
      var id = this.routerActivated.snapshot.params['id'];
      var arr = JSON.parse(localStorage.getItem('deslikesFilmes'));

      if (arr.length) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].filmeId == id && arr[i].usuarioId == this.usuario.id) {
            this.deslikes = [arr[i]];
            break;
          } else {
            this.deslikes = [{"filmeId": "x"}];
          }
        }
      } else {
        this.deslikes = [{"filmeId": "x"}];
      }
    } else {
      this.deslikes = [{"filmeId": "x"}];
    }
  }

  /**
   * Remove "não gostei"
   */
  removeDeslike(id) {
    if (localStorage.getItem('deslikesFilmes')) {
      var arr = JSON.parse(localStorage.getItem('deslikesFilmes'));
      var novoDeslike = [];

      for (var i = 0; i < arr.length; i++) {
        if (arr[i].filmeId != id) {
          novoDeslike.push(arr[i]);
        } else if (arr[i].filmeId == id && arr[i].usuarioId != this.usuario.id) {
          novoDeslike.push(arr[i]);
        }
      }

      localStorage.removeItem('deslikesFilmes');
      localStorage.setItem('deslikesFilmes', JSON.stringify(novoDeslike));
    }

    this.buscarDeslike();
  }

  /**
   * Adiciona aos visualizados
   */
  addVisualizado(id, titulo, poster) {
    var novoVisualizado = [];

    if (localStorage.getItem('filmesVisualizados')) {
      var arr = JSON.parse(localStorage.getItem('filmesVisualizados'));
      for (var i = 0; i < arr.length; i++) {
        novoVisualizado.push(arr[i]);
      }

      novoVisualizado.push({
        "usuarioId": this.usuario.id,
        "titulo": titulo,
        "filmeId": id,
        "poster": poster
      });

      localStorage.setItem('filmesVisualizados', JSON.stringify(novoVisualizado));
      this.buscaVisualizados();
    } else {
      novoVisualizado.push({
        "usuarioId": this.usuario.id,
        "titulo": titulo,
        "filmeId": id,
        "poster": poster
      });

      localStorage.setItem('filmesVisualizados', JSON.stringify(novoVisualizado));
      this.buscaVisualizados();
    }
  }

  /**
   * Busca visualizado
   */
  buscaVisualizados() {
    if (localStorage.getItem('filmesVisualizados')) {
      var id = this.routerActivated.snapshot.params['id'];
      var arr = JSON.parse(localStorage.getItem('filmesVisualizados'));

      if (arr.length) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].filmeId == id && arr[i].usuarioId == this.usuario.id) {
            this.visualizados = [arr[i]];
            break;
          } else {
            this.visualizados = [{"filmeId": "x"}];
          }
        }
      } else {
        this.visualizados = [{"filmeId": "x"}];
      }
    } else {
      this.visualizados = [{"filmeId": "x"}];
    }
  }

  /**
   * Remove visualizado
   */
  removeVisualizado(id) {
    var arr = JSON.parse(localStorage.getItem('filmesVisualizados'));
    var novoVisualizado = [];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].filmeId != id) {
        novoVisualizado.push(arr[i]);
      } else if (arr[i].filmeId == id && arr[i].usuarioId != this.usuario.id) {
        novoVisualizado.push(arr[i]);
      }
    }

    localStorage.removeItem('filmesVisualizados');
    localStorage.setItem('filmesVisualizados', JSON.stringify(novoVisualizado));
    this.buscaVisualizados();
  }
}
