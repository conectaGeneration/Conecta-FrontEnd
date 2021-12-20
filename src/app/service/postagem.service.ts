import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Postagem } from '../model/Postagem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

getAllPostagem(): Observable<Postagem[]>{
  return this.http.get<Postagem[]>('https://projetoconecta.herokuapp.com/postagem', this.token)
}

getByIdPostagem(id: number): Observable<Postagem>{
  return this.http.get<Postagem>(`https://projetoconecta.herokuapp.com/postagem/${id}`, this.token)
}

getByTituloPostagem(titulo: string): Observable<Postagem[]>{
  return this.http.get<Postagem[]>(`https://projetoconecta.herokuapp.com/postagem/titulo/${titulo}`, this.token)
}

postPostagem(postagem: Postagem) : Observable<Postagem>{
  return this.http.post<Postagem>('https://projetoconecta.herokuapp.com/postagem', postagem, this.token)
}

putPostagem(postagem: Postagem): Observable<Postagem>{
  return this.http.put<Postagem>('https://projetoconecta.herokuapp.com/postagem', postagem, this.token)
}

deletePostagem(id: number){
  return this.http.delete(`https://projetoconecta.herokuapp.com/postagem/${id}`, this.token)
}

}
