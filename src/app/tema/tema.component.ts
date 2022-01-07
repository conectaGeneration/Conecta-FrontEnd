import { TemaService } from './../service/tema.service';
import { Tema } from './../model/Tema';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../service/alertas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css'],
})
export class TemaComponent implements OnInit {
  tema: Tema = new Tema();
  listaTemas: Tema[];

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertasService: AlertasService
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/entrar']);
    }

    if (environment.tipo != 'admin') {
      Swal.fire({
        icon: 'warning',
        title: 'Você precisa ser um administrador para acessar essa rota!',
        confirmButtonText: 'Certo!',
        timer: 5000,
        timerProgressBar: true
      })
      this.router.navigate(['/inicio'])
    }

    this.findAllTemas();
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  cadastrar() {
    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp;
      Swal.fire({
        icon: 'success',
        title: 'Tema cadastrado com sucesso!',
        confirmButtonText: 'Certo!',
        timer: 5000,
        timerProgressBar: true
      })
      this.findAllTemas();
      this.tema = new Tema();
    });
  }
}
