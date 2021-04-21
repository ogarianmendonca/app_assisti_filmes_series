import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmesComponent } from './filmes.component';
import { VisualizarFilmePage } from './visualizar-filme/visualizar-filme.page';
import { FilmesFavoritosPage } from './filmes-favoritos/filmes-favoritos.page';
import { FilmesAssistidosPage } from './filmes-assistidos/filmes-assistidos.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FilmesPageRoutingModule } from './filmes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FilmesPageRoutingModule,
    IonicModule,
    FormsModule,
  ],
  declarations: [
    FilmesComponent,
    VisualizarFilmePage,
    FilmesFavoritosPage,
    FilmesAssistidosPage
  ]
})
export class FilmesModule { }
