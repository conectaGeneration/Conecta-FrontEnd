import { TemaComponent } from './tema/tema.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
//import { pathToFileURL } from 'url';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EntrarComponent } from './entrar/entrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { SobreComponent } from './sobre/sobre.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { UsuarioEditComponent } from './edit/usuario-edit/usuario-edit.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SobreDeslogadoComponent } from './sobre-deslogado/sobre-deslogado.component';
import { CursosComponent } from './cursos/cursos.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' }, //quando a uri estiver vazia, sera acessado
  {
    path: 'entrar',
    component: EntrarComponent,
  },
  {
    path: 'cadastrar',
    component: CadastrarComponent,
  },
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'sobre',
    component: SobreComponent,
  },
  {
    path: 'tema',
    component: TemaComponent,
  },
  {
    path: 'cursos',
    component: CursosComponent,
  },
  {
    path: 'tema-edit/:id',
    component: TemaEditComponent,
  },
  {
    path: 'tema-delete/:id',
    component: TemaDeleteComponent,
  },
  {
    path: 'postagem-edit/:id',
    component: PostagemEditComponent,
  },
  {
    path: 'postagem-delete/:id',
    component: PostagemDeleteComponent,
  },
  {
    path: 'usuario-edit/:id',
    component: UsuarioEditComponent,
  },
  {path: 'landing-page',
    component: LandingPageComponent,
  },
  {
    path: 'sobre-deslogado',
    component: SobreDeslogadoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
