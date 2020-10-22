import { Component } from '@angular/core';
import { LoadingsService } from 'src/app/services/loadings.service';
import { TendenciasService } from 'src/app/services/tendencias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public urlImagens = 'https://image.tmdb.org/t/p/w500/';
  public listaTendencias = new Array<any>();
  public paginaTendencias = 1;
  public refresher;
  public isRefreshing = false;
  public infiniteScroll;

  constructor(
    private tendenciasService: TendenciasService,
    private loadingService: LoadingsService
  ) {}

  ngOnInit(){
    this.buscarTendencias();
  }

  /**
   * Refresh
   */
  doRefresh(event) {
    this.refresher = event;
    this.isRefreshing = true;
    this.buscarTendencias();
  }

  /**
   * Load
   */
  loadData(event) {
    this.paginaTendencias++;
    this.infiniteScroll = event;
    this.buscarTendencias(true);
  }

  /**
   * Busca filmes
   */
  buscarTendencias(novaPagina: boolean = false) {
    this.loadingService.showLoading();

    this.tendenciasService.buscarTendencias(this.paginaTendencias).subscribe(
      response => {
        if (novaPagina) {
          this.listaTendencias = this.listaTendencias.concat(response.results);
          this.infiniteScroll.target.complete();
        } else {
          this.listaTendencias = response.results;
        }

        this.loadingService.hideLoading();

        if (this.isRefreshing){
          this.refresher.target.complete();
          this.isRefreshing = false;
        }
      }, error => {
        this.loadingService.hideLoading();

        if (this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      });

    this.loadingService.hideLoading();
  }
}
