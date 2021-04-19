import { Component, OnInit } from '@angular/core';
import { SeriadosService } from 'src/app/services/seriados.service';
import { LoadingsService } from 'src/app/services/loadings.service';
import { ActivatedRoute } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-visualizar-temporada',
  templateUrl: './visualizar-temporada.page.html',
  styleUrls: ['./visualizar-temporada.page.scss']
})
export class VisualizarTemporadaPage implements OnInit {

  public urlImagens = "https://image.tmdb.org/t/p/w500";
  public temporada: any;
  public usuario = this.authService.getUsuarioStorage();
  public seriadoId: number;
  public temporadaId: number;
  public tempFinalizada: boolean = false;

  constructor(private seriadosService: SeriadosService,
    private loadingsService: LoadingsService,
    private routerActivated: ActivatedRoute,
    private alertasService: AlertasService,
    private authService: AuthService,
    private toastsService: ToastsService
  ) { }

  ngOnInit() {
    this.buscarTemporadaSelecionado();
  }

  buscarTemporadaSelecionado() {
    this.loadingsService.showLoading();
    this.seriadoId = this.routerActivated.snapshot.params['id'];
    this.temporadaId = this.routerActivated.snapshot.params['temp'];

    this.seriadosService.buscarTemporadaSelecionada(this.seriadoId,  this.temporadaId)
      .subscribe((resp: any) => {
        this.temporada = resp;
        this.loadingsService.hideLoading();
        this.buscaVisualizados();
      });
  }

  showDetalhes(dadosEp) {
    this.alertasService.showDetalhesEp(dadosEp.name, dadosEp.overview);
  }

  addVisualizado(id) {
    var novoVisualizado = [];

    if (localStorage.getItem('episodiosVisualizados')) {
      var arr = JSON.parse(localStorage.getItem('episodiosVisualizados'));
      for (var i = 0; i < arr.length; i++) {
        novoVisualizado.push(arr[i]);
      }

      novoVisualizado.push({
        "usuarioId": this.usuario.id,
        "episodioId": id,
        "seriadoId": this.seriadoId,
        "temporadaId": this.temporadaId
      });

      localStorage.setItem('episodiosVisualizados', JSON.stringify(novoVisualizado));
    } else {
      novoVisualizado.push({
        "usuarioId": this.usuario.id,
        "episodioId": id,
        "seriadoId": this.seriadoId,
        "temporadaId": this.temporadaId
      });

      localStorage.setItem('episodiosVisualizados', JSON.stringify(novoVisualizado));
    }

    this.buscaVisualizados();
  }

  buscaVisualizados() {
    if (localStorage.getItem('episodiosVisualizados')) {
      var arr = JSON.parse(localStorage.getItem('episodiosVisualizados'));

      if (arr.length) {
        var epsId = [];
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].usuarioId == this.usuario.id) {
            epsId.push(arr[i].episodioId);
          }
        }

        this.temporada.episodes.forEach(element => {
          if (epsId.indexOf(element.id) != -1) {
            element.assistido = true;
          } else if (epsId.indexOf(element.id) == -1) {
            element.assistido = false;
          }
        });

        this.contaEpsAssistidos();
      } else {
        this.temporada.episodes.forEach(element => {
          element.assistido = false;
        });
      }
    }
  }

  removeVisualizado(id) {
    if (localStorage.getItem('episodiosVisualizados')) {
      var arr = JSON.parse(localStorage.getItem('episodiosVisualizados'));
      var novoVisualizado = [];

      if (arr.length) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].episodioId != id) {
            novoVisualizado.push(arr[i]);
          } else if (arr[i].episodioId == id && arr[i].usuarioId != this.usuario.id) {
            novoVisualizado.push(arr[i]);
          }
        }

        localStorage.removeItem('episodiosVisualizados');
        localStorage.setItem('episodiosVisualizados', JSON.stringify(novoVisualizado));
        this.buscaVisualizados();
      }
    }
  }

  contaEpsAssistidos() {
    if (localStorage.getItem('episodiosVisualizados')) {
      var arr = JSON.parse(localStorage.getItem('episodiosVisualizados'));

      if (arr.length) {
        var qtdAssistidos = 0;

        for (var i = 0; i < arr.length; i++) {
          if (arr[i].seriadoId == this.seriadoId && arr[i].temporadaId == this.temporadaId) {
            qtdAssistidos += 1;
          }
        }

        if (qtdAssistidos == this.temporada.episodes.length) {
          this.tempFinalizada = true;
          this.toastsService.showToastSuccess("Todos os episódios foram assistidos!");
        } else {
          this.tempFinalizada = false;
        }
      }
    }
  }
}
