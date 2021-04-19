import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeriadosService {

  private baseApi = 'https://api.themoviedb.org/3/tv/';
  private apiKey = '?api_key=440e420476873e8698c577c4a85f2efe&language=pt-BR';
  private baseApiSearch = 'https://api.themoviedb.org/3/search/tv';

  constructor(public http: HttpClient) { }

  buscarSeriados(paginaMovies = 1) {
    return this.http.get<any>(this.baseApi + 'popular' + this.apiKey + '&page=' + paginaMovies);
  }

  buscarSeriadoSelecionado(id) {
    return this.http.get<any>(this.baseApi + id + this.apiKey + '&append_to_response=videos');
  }

  buscarTemporadaSelecionada(id, temp) {
    return this.http.get<any>(
      this.baseApi + id + '/season/' + temp + this.apiKey + '&append_to_response=videos'
    );
  }

  buscarSeriadosPorTitulo(titulo) {
    return this.http.get<any>(this.baseApiSearch + this.apiKey + '&query=' + titulo + '&page=1&include_adult=false');
  }
}
