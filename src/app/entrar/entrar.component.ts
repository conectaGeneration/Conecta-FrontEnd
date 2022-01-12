import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { UserLogin } from '../model/UserLogin';
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
    private router: Router) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  entrar() {
    this.auth.entrar(this.userLogin).subscribe(
      (resp: UserLogin) => {
        this.userLogin = resp;

        environment.token = this.userLogin.token;
        environment.nome = this.userLogin.nome;
        environment.id = this.userLogin.id;
        environment.foto = this.userLogin.foto;
        environment.tipo = this.userLogin.tipo;
        environment.sobre = this.userLogin.sobre;
        environment.cargo = this.userLogin.cargo;
        environment.contato = this.userLogin.contato;

        this.router.navigate(['/inicio']);
      },
      (erro) => {
        if (erro.status == 401) {
          Swal.fire({
            icon: 'error',
            title: 'Email ou senha inválidos',
            confirmButtonText: 'Certo!',
            timer: 5000,
            timerProgressBar: true,
          });
        }
      }
    );
  }
}
