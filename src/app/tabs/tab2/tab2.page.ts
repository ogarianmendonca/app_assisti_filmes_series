import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmesService } from 'src/app/services/filmes.service';
import { LoadingsService } from 'src/app/services/loadings.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public urlImagens = 'https://image.tmdb.org/t/p/w500/';
  public listaFilmes = new Array<any>();
  public paginaFilmes = 1;
  public refresher;
  public isRefreshing = false;
  public infiniteScroll;
  public urlOrigem;

  constructor(
    private filmesService: FilmesService,
    private loadingService: LoadingsService,
    private toastsService: ToastsService,
    private routerActivated: ActivatedRoute,
  ) {}

  ngOnInit(){
    this.buscarFilmes();
    this.urlOrigem = this.routerActivated.snapshot['_routerState'].url;
  }

  doRefresh(event) {
    this.refresher = event;
    this.isRefreshing = true;
    this.buscarFilmes();
  }

  loadData(event) {
    this.paginaFilmes++;
    this.infiniteScroll = event;
    this.buscarFilmes(true);
  }

  buscarFilmes(novaPagina: boolean = false) {
    this.loadingService.showLoading();

    this.filmesService.buscarFilmes(this.paginaFilmes).subscribe(
      response => {
        if (novaPagina) {
          this.listaFilmes = this.listaFilmes.concat(response.results);
          this.infiniteScroll.target.complete();
        } else {
          this.listaFilmes = response.results;
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
  }

  buscarFilmesPorTitulo(event) {
    if (event.target.value.length > 3) {
      this.filmesService.buscarFilmesPorTitulo(event.target.value).subscribe(
        response => {
          this.listaFilmes = response.results;
        }, error => {
          this.toastsService.showToastWarning('Houve um erro!')
        });
    } else if (event.target.value.length == 0) {
      this.paginaFilmes = 1;
      this.buscarFilmes();
    }
  }
}
