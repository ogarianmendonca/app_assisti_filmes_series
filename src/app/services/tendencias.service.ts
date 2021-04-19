import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TendenciasService {

  private baseApi = 'https://api.themoviedb.org/3/trending/all/day';
  private apiKey = '?api_key=440e420476873e8698c577c4a85f2efe&language=pt-BR';

  constructor(public http: HttpClient) { }

  buscarTendencias(paginaMovies = 1) {
    return this.http.get<any>(this.baseApi + this.apiKey + '&page=' + paginaMovies);
  }

}
