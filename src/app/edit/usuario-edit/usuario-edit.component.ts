import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
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
  idUser: number;
  confirmarSenha: string;
  tipoUsuario: string;
  contato = environment.contato;
  sobre = environment.sobre;
  cargo = environment.cargo;


  constructor(
    public authService: AutenticacaoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.router.navigate(['/entrar']);
    }

    this.idUser = this.route.snapshot.params['id'];
    this.findByIdUser(this.idUser);
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
        title: 'As senhas não estão correspondentes!',
        icon: 'warning',
        confirmButtonText: 'Certo!',
      });
    } else {
      this.authService.atualizar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.router.navigate(['/inicio']);
        Swal.fire({
          title: 'Usuário atualizado com sucesso!',
          text: 'Faça o login novamente para aplicar as alterações',
          confirmButtonText: 'Certo!',
          timer: 10000,
          timerProgressBar: true,
        });
        environment.token = '';
        environment.nome = '';
        environment.foto = '';
        environment.id = 0;
        this.router.navigate(['/entrar']);
      });
    }
  }

  findByIdUser(id: number) {
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp;
    });
  }
}
