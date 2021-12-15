import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Postagem } from '../model/Postagem';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import { AutenticacaoService } from '../service/autenticacao.service';


import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

postagem: Postagem = new Postagem()
listaPostagem: Postagem[]

tema: Tema = new Tema()
listaTemas: Tema[]
idTema:number

usuario: Usuario = new Usuario()
idUsuario = environment.id

  foto = environment.foto
  nome = environment.nome

  constructor(
  private router: Router,
  private postagemService: PostagemService,
  private temaService: TemaService,
  private autenticacaoService: AutenticacaoService
  ){}

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      alert('Seção expirou, faça login novamente')
      this.router.navigate(['/entrar'])

    }

    this.getAllTema()
    this.getAllPostagem()
  }

  getAllTema(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  getAllPostagem(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[])=>{
      this.listaPostagem = resp
    })
  }

  findByIdUser(){
    this.autenticacaoService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) =>{
      this.usuario = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      alert('Postagem realizada')
      this.postagem = new Postagem()
      this.getAllPostagem()
    })
  }



}
