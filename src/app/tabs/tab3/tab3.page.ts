import { Component } from '@angular/core';
import { SeriadosService } from 'src/app/services/seriados.service';
import { LoadingsService } from 'src/app/services/loadings.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public urlImagens = 'https://image.tmdb.org/t/p/w500/';
  public listaSeriados = new Array<any>();
  public paginaSeriados = 1;
  public refresher;
  public isRefreshing = false;
  public infiniteScroll;

  constructor(
    private seriadosService: SeriadosService,
    private loadingService: LoadingsService,
    private toastsService: ToastsService
  ) { }

  ngOnInit() {
    this.buscarSeriados();
  }

  doRefresh(event) {
    this.refresher = event;
    this.isRefreshing = true;
    this.buscarSeriados();
  }

  loadData(event) {
    this.paginaSeriados++;
    this.infiniteScroll = event;
    this.buscarSeriados(true);
  }

  buscarSeriados(novaPagina: boolean = false) {
    this.loadingService.showLoading();

    this.seriadosService.buscarSeriados(this.paginaSeriados).subscribe(
      response => {
        if (novaPagina) {
          this.listaSeriados = this.listaSeriados.concat(response.results);
          this.infiniteScroll.target.complete();
        } else {
          this.listaSeriados = response.results;
        }

        this.loadingService.hideLoading();

        if (this.isRefreshing) {
          this.refresher.target.complete();
          this.isRefreshing = false;
        }
      }, error => {
        this.loadingService.hideLoading();

        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      });
  }

  buscarSeriadosPorTitulo(event) {
    if (event.target.value.length > 3) {
      this.seriadosService.buscarSeriadosPorTitulo(event.target.value).subscribe(
        response => {
          console.log(response);
          this.listaSeriados = response.results;
        }, error => {
          this.toastsService.showToastWarning('Houve um erro!')
        });
    } else if (event.target.value.length == 0) {
      this.paginaSeriados = 1;
      this.buscarSeriados();
    }
  }
}
