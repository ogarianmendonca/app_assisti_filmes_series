import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoadingsService } from 'src/app/services/loadings.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss']
})
export class CadastrarPage implements OnInit {

  user: Usuario;
  formularioUsuario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private loadingsService: LoadingsService,
    private toastsService: ToastsService
  ) { }

  ngOnInit() {
    this.validaFormulario();
  }

  validaFormulario() {
    this.formularioUsuario = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      imagem: [''],
      password: ['', [Validators.required]],
      confimarSenha: ['', [Validators.required]]
    });
  }

  cadastrarUsuario() {
    this.loadingsService.showLoading();

    if (this.formularioUsuario.value.password !== this.formularioUsuario.value.confimarSenha) {
      this.toastsService.showToastWarning('As senhas não conferem!');
      this.loadingsService.hideLoading();
      return false;
    }

    this.usuarioService.cadastrarUsuario(this.formularioUsuario.value).subscribe((resp: Usuario) => {
      this.toastsService.showToastSuccess('Usuário cadastrado com sucesso!');
      this.loadingsService.hideLoading();
      this.router.navigate(['auth/login']);
    }, (error) => {
      if (error.statusText == 'Unknown Error') {
        this.toastsService.showToastWarning("Ocorreu um erro. Tente novamente mais tarde.");
      } else {
        this.toastsService.showToastWarning(error.error.message + ' <br>Já existe uma conta com o e-mail informado.');
      }

      this.loadingsService.hideLoading();
    });
  }

  login() {
    this.router.navigate(['auth/login']);
  }
}
