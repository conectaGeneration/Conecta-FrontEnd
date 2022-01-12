import { Component } from '@angular/core';
import { AutenticacaoService } from './service/autenticacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public auth: AutenticacaoService
  ){

  }
}
