import { Tema } from './../model/Tema';
import { TemaService } from './../service/tema.service';
import { PostagemService } from './../service/postagem.service';
import { Postagem } from './../model/Postagem';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../service/autenticacao.service';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  postagem: Postagem = new Postagem();
  listaPostagens: Postagem[];
  tituloPost: string;

  tema: Tema = new Tema();
  listaTemas: Tema[];
  idTema: number;
  nomeTema: string;
  segmentoTema: string;

  user: Usuario = new Usuario();
  idUser = environment.id;

  foto = environment.foto;
  nome = environment.nome;
  imagem = environment.imagem;

  key = 'data'
  reverse = true


  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public authService: AutenticacaoService,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.getAllTemas();
    this.getAllPostagens();
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  getAllPostagens() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    });
  }

  findByIdUser() {
    this.authService.getByIdUsuario(this.idUser).subscribe((resp: Usuario) => {
      this.user = resp;
    });
  }

  publicar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    this.user.id = this.idUser;
    this.postagem.usuario = this.user;

    this.postagemService
      .postPostagem(this.postagem)
      .subscribe((resp: Postagem) => {
        this.postagem = resp;
        environment.imagem = this.postagem.imagem;
        Swal.fire({
          icon: 'success',
          title: 'Sua publicação foi postada com sucesso!',
          confirmButtonText: 'Certo!',
          timer: 5000,
          timerProgressBar: true
        })
        this.postagem = new Postagem();
        this.getAllPostagens();
        this.getAllTemas();
      });
  }

  findByTituloPostagem() {
    if (this.tituloPost == '') {
      this.getAllPostagens()
    } else {
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]) => {
        this.listaPostagens = resp
      })
    }
  }

  findBySegmentoTema(){
    if (this.segmentoTema == '') {
      this.getAllTemas()
    } else {
      this.temaService.getBySegmentoTema(this.segmentoTema).subscribe((resp: Tema[]) => {
        this.listaTemas = resp
      })
    }
  }


}
