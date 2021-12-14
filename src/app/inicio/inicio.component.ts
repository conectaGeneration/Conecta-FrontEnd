import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  foto = environment.foto
  nome = environment.nome

  constructor(private router: Router) { }


  ngOnInit(){
    if(environment.token == ''){
      alert('Seção expirou, faça login novamente')
      this.router.navigate(['/entrar'])

    }
  }

}
