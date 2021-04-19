import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  atualizarPerfil = new EventEmitter<Usuario>();

  constructor(private http: HttpClient) { }

  logar(dados: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(environment.api_url + 'auth/login', dados)
      .pipe(tap(
        (resp: any) => {
          localStorage.setItem('token', resp.token);
        }));
  }

  verificaUsuarioLogado(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): any {
    return this.http.get(environment.api_url + 'auth/logout');
  }

  getUsuarioAutenticado(): Observable<Usuario> {
    return this.http.get<Usuario>(environment.api_url + 'api/usuario/getUser')
      .pipe(tap(
        (resp: any) => {
          localStorage.setItem('user', btoa(JSON.stringify(resp.usuario)));
          this.atualizarPerfil.emit(resp.usuario);
        }));
  }

  getUsuarioStorage(): Usuario {
    return localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) : null;
  }
}
