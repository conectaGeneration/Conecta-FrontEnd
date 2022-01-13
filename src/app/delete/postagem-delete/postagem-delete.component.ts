import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { TemaService } from './../../service/tema.service';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css'],
})
export class PostagemDeleteComponent implements OnInit {

  idPostagem: number
  postagem: Postagem = new Postagem();
  listaPostagens: Postagem[];

  imagem = environment.imagem;

  constructor(
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute,
    private temaService: TemaService
  ) {}


  ngOnInit() {

    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
  }
    this.idPostagem = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPostagem)

  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }


  apagar() {
    this.postagemService.deletePostagem(this.idPostagem).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Postagem apagada com sucesso!',
        confirmButtonText: 'Certo!',
        timer: 5000,
        timerProgressBar: true
      })
      this.router.navigate(['/inicio']);
    });
  }
}
