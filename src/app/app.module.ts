import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RodapeComponent } from './rodape/rodape.component';
import { MenuComponent } from './menu/menu.component';
import { SobreComponent } from './sobre/sobre.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// ESTA COM  A IMPORTAÇÃO DO FONTAWESOME

@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
    MenuComponent,
    SobreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
