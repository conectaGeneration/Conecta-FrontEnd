import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
// import { pathToFileURL } from 'url';
import { SobreComponent } from './sobre/sobre.component';

const routes: Routes = [

  { path:'', redirectTo: 'sobre', pathMatch: 'full'},
  {
    path:'menu', component: MenuComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
