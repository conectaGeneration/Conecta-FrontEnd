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
  return this.http.get<Postagem[]>('http://localhost:8080/postagem', this.token)
}

getByIdPostagem(id: number): Observable<Postagem>{
  return this.http.get<Postagem>(`http://localhost:8080/postagens/${id}`, this.token)
}

postPostagem(postagem: Postagem) : Observable<Postagem>{
  return this.http.post<Postagem>('http://localhost:8080/postagem', postagem, this.token)
}

putPostagem(postagem: Postagem): Observable<Postagem>{
  return this.http.put<Postagem>('http://localhost:8080/postagens', postagem, this.token)
}

deletePostagem(id: number){
  return this.http.delete(`http://localhost:8080/postagens/${id}`, this.token)
}

}
