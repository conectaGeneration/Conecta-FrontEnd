import { Tema } from './../model/Tema';
import { TemaService } from './../service/tema.service';
import { PostagemService } from './../service/postagem.service';
import { Postagem } from './../model/Postagem';
import { ActivatedRoute, Router } from '@angular/router';
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
  contato = environment.contato;
  sobre = environment.sobre;
  cargo = environment.cargo;

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

/*
salvar() {
    this.user.id = this.idUser;
    this.authService
      .atualizar(this.user)
      .subscribe((resp: Usuario) => {
        this.user = resp;
        environment.sobre = this.user.sobre;
        Swal.fire({
          icon: 'success',
          title: 'Suas informações foram atualizadas com sucesso!',
          confirmButtonText: 'Certo!',
          timer: 5000,
          timerProgressBar: true
        })
        this.user = new Usuario();
        this.findByIdUser();
      });
  }*/



  salvar() {
    this.user.sobre = this.sobre;
    this.user.cargo = this.cargo;
    this.user.contato = this.contato;

      this.authService.atualizar(this.user).subscribe((resp: Usuario) => {
        this.user = resp;
        this.router.navigate(['/inicio']);
        Swal.fire({
          icon: 'success',
          title: 'Informações atualizadas com sucesso!',
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





