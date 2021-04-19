import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlApiUsuario = environment.api_url + 'api/usuario/';

  constructor(private http: HttpClient) { }

  cadastrarUsuario(dados): Observable<Usuario> {
    return this.http.post<Usuario>(environment.api_url + 'auth/criar-usuario-mobile', dados, httpOptions);
  }

  editarUsuario(id, dados): Observable<Usuario> {
    return this.http.put<Usuario>(this.urlApiUsuario + 'editar/' + id, dados, httpOptions);
  }

  excluirPerfil(id): Observable<any>{
    return this.http.delete<any>(this.urlApiUsuario + 'excluir-perfil/' + id);
  }

  uploadImagem(arquivo) {
    const formData = new FormData();
    formData.append('imagem', arquivo[0]);
    return this.http.post(this.urlApiUsuario + 'upload', formData);
  }
}
