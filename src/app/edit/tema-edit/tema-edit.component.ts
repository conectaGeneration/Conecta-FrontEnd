import { environment } from './../../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { TemaService } from './../../service/tema.service';
import { Tema } from './../../model/Tema';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {

    if (environment.token == '') {
      this.router.navigate(['/entrar'])

    }

    let id = this.route.snapshot.params['id']
    this.findByIdTema(id)

  }

  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp
    })

  }

  atualizar() {
    this.temaService.putTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      Swal.fire({
        icon: 'success',
        title: 'Tema atualizado com sucesso!',
        confirmButtonText: 'Certo!',
        timer: 5000,
        timerProgressBar: true
      })
      this.router.navigate(['/tema'])
    })
  }

}
