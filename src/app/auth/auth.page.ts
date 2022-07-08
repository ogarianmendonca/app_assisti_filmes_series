import { ToastsService } from '../services/toasts.service';
import { LoadingsService } from '../services/loadings.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastsService: ToastsService,
              private loadingsService: LoadingsService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      save_login: [null]
    });

    this.saveLogin();
  }

  saveLogin() {
    if (this.authService.getCredenciais()?.save_login) {
      this.formulario.controls['email'].setValue(this.authService.getCredenciais()?.email);
      this.formulario.controls['password'].setValue(this.authService.getCredenciais()?.password);

      this.logar();
    }
  }

  logar() {
    this.loadingsService.showLoading();

    this.authService.logar(this.formulario.value).subscribe(
      (response) => {
        this.loadingsService.hideLoading();
        this.router.navigate(['/tabs/tab1']);

        if (this.formulario.value.save_login) {
          this.authService.setCredenciais(this.formulario.value);
        }
      }, (errorResponse: HttpErrorResponse) => {
        if (errorResponse.error.message === 'Usuário inativo!') {
          this.loadingsService.hideLoading();
          this.toastsService.showToastWarning(errorResponse.error.message);
        } else if (errorResponse.error.message === 'Não autorizado!') {
          this.loadingsService.hideLoading();
          this.toastsService.showToastWarning('E-mail e/ou senha inválidos!');
        } else {
          this.loadingsService.hideLoading();
          this.toastsService.showToastWarning('Não foi possível efetuar login!');
        }
      }
    );
  }

  novoCadastro() {
    this.router.navigate(['auth/cadastrar']);
  }
}
