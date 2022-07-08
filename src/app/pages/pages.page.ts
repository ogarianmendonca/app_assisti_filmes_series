import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { AuthService } from '../services/auth.service';
import { LoadingsService } from '../services/loadings.service';
import { ToastsService } from '../services/toasts.service';

@Component({
  selector: 'app-pages',
  templateUrl: 'pages.page.html',
  styleUrls: ['./pages.page.scss']
})
export class PagesPage {
  user: Usuario;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingsService: LoadingsService,
    private toastsService: ToastsService
  ) {}

  ngOnInit() {
    this.buscarUsuarioLogado();
    this.atualizaUsuarioLogado();
  }

  buscarUsuarioLogado() {
    this.loadingsService.showLoading();

    this.authService.getUsuarioAutenticado().subscribe((resp: any) => {
      this.user = resp.usuario;
      this.loadingsService.hideLoading();
    }, (error: any) => {
      if (error.status == 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['auth/login']);
        this.loadingsService.hideLoading();
      }

      this.loadingsService.hideLoading();
      this.toastsService.showToastWarning('Não foi possível carregar a página!');
    });
  }

  atualizaUsuarioLogado() {
    this.authService.atualizarPerfil
    .subscribe((resp: Usuario) => {
      this.user = resp;
      if (this.user.status == false) {
        this.authService.logout();
      }
    });
  }

  logout(e) {
    this.loadingsService.sairLoading();
    e.preventDefault();
    this.authService.logout().subscribe(resp => {
      this.authService.removeItensStorage();
      this.router.navigate(['auth/login']);
      this.loadingsService.hideLoading();
    });
  }
}
