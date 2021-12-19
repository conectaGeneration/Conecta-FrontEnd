import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AlertasService } from '../service/alertas.service';
import { AutenticacaoService } from '../service/autenticacao.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css'],
})
export class EntrarComponent implements OnInit {
  userLogin: UserLogin = new UserLogin();

  constructor(
    private auth: AutenticacaoService,
    private router: Router,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
  }

  entrar() {
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp;

      environment.token = this.userLogin.token;
      environment.nome = this.userLogin.nome;
      environment.id = this.userLogin.id;
      environment.foto = this.userLogin.foto;

      this.router.navigate(['/inicio']);
    },
      (erro) => {
        if (erro.status == 401) {
          this.alertasService.showAlertDanger('Email ou senha inválidos');
        }
      }
    );
  }
}
