import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AutenticacaoService } from '../service/autenticacao.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private auth: AutenticacaoService,
    private router: Router,
    public authService: AutenticacaoService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUsuario

    if (this.usuario.senha != this.confirmarSenha) {
      Swal.fire({
        icon: 'warning',
        title: 'Repita a senha corretamente',
        confirmButtonText: 'Certo!',
      })
    }else{
      this.auth.cadastrar(this.usuario).subscribe((resp: Usuario) =>{
        this.usuario = resp
        this.router.navigate(['/entrar'])
        Swal.fire({
          icon: 'success',
          title: 'Usuário cadastrado com sucesso!',
          confirmButtonText: 'Certo!',
          timer: 10000,
          timerProgressBar: true
        })
      })
    }
  }
}
