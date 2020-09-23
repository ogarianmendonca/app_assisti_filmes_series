import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  private baseApi = 'https://api.themoviedb.org/3/movie/';
  private apiKey = '?api_key=440e420476873e8698c577c4a85f2efe&language=pt-BR';
  private baseApiSearch = 'https://api.themoviedb.org/3/search/movie'

  constructor(public http: HttpClient) { }

  /**
   * Busca por filmes populares
   */
  buscarFilmes(paginaMovies = 1) {
    return this.http.get<any>(this.baseApi + 'popular' + this.apiKey + '&page=' + paginaMovies);
  }

  /**
   * Busca filme por id
   */
  buscarFilmeSelecionado(id) {
    return this.http.get<any>(this.baseApi + id + this.apiKey + '&append_to_response=videos');
  }

  /**
   * Busca o filme por título
   */
  buscarFilmesPorTitulo(titulo) {
    return this.http.get<any>(this.baseApiSearch + this.apiKey + '&query=' + titulo + '&page=1&include_adult=false');
  }
}
