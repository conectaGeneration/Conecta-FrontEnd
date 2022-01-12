import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  constructor(private http: HttpClient) {}

  entrar(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(
      'https://projetoconecta.herokuapp.com/usuario/logar',
      userLogin
    );
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(
      'https://projetoconecta.herokuapp.com/usuario/cadastrar',
      usuario
    );
  }

  getByIdUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(
      `https://projetoconecta.herokuapp.com/usuario/${id}`
    );
  }

  atualizar(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      'https://projetoconecta.herokuapp.com/usuario/atualizar',
      usuario
    );
  }

  logado() {
    let ok: boolean = false;

    if (environment.token != '') {
      ok = true;
    }

    return ok;
  }

  adm() {
    let ok: boolean = false;

    if (environment.tipo == 'admin') {
      ok = true;
    }

    return ok;
  }
}
