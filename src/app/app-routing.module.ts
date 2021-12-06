import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
//import { pathToFileURL } from 'url';
//import { SobreComponent } from './sobre/sobre.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EntrarComponent } from './entrar/entrar.component';

const routes: Routes = [
  { path: '', redirectTo: 'sobre', pathMatch: 'full' },
  {
    path: 'menu',
    component: MenuComponent,
  },

  { path: '', redirectTo: 'entrar', pathMatch: 'full' }, //quando a uri estiver vazia, sera acessado
  {
    path: 'entrar',
    component: EntrarComponent,
  },
  {
    path: 'cadastrar',
    component: CadastrarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
