import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css'],
})
export class UsuarioEditComponent implements OnInit {
  usuario: Usuario = new Usuario();
  idUsuario: number;
  confirmarSenha: string;
  tipoUsuario: string;


  constructor(
    public authService: AutenticacaoService,
    private route: ActivatedRoute,
    private router: Router,
    private alertasService: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.router.navigate(['/entrar']);
    }

    this.idUsuario = this.route.snapshot.params['id'];
    this.findByIdUser(this.idUsuario);
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value;
  }

  atualizar() {
    this.usuario.tipo = this.tipoUsuario;

    if (this.usuario.senha != this.confirmarSenha) {
      this.alertasService.showAlertDanger('As senhas estão incorretas!');
    } else {
      this.authService.atualizar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.router.navigate(['/inicio']);
        this.alertasService.showAlertSuccess('Usuário atualizado com sucesso!');

        environment.token = '';
        environment.nome = '';
        environment.foto = '';
        environment.id = 0;
        this.router.navigate(['/entrar'])
        this.alertasService.showAlertInfo('Faça o login novamente para aplicar as alterações');
      });
    }
  }

  findByIdUser(id: number) {
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp;
    });
  }
}
