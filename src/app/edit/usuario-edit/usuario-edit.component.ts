import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

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
      Swal.fire({
        icon: 'error',
        title: 'As senhas estão incorretas!',
        confirmButtonText: 'Vou verificar novamente!',
      })
    } else {
      this.authService.atualizar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.router.navigate(['/inicio']);
        Swal.fire({
          icon: 'success',
          title: 'Usuário atualizado com sucesso!',
          confirmButtonText: 'Certo!',
          timer: 5000,
          timerProgressBar: true
        })

        environment.token = '';
        environment.nome = '';
        environment.foto = '';
        environment.id = 0;
        this.router.navigate(['/entrar'])
        Swal.fire({
          icon: 'warning',
          title: 'Faça o login novamente para aplicar as alterações',
          confirmButtonText: 'Certo!'
        })
      });
    }
  }

  findByIdUser(id: number) {
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp;
    });
  }
}
