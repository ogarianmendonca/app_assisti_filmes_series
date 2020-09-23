import { VisualizarFilmePage } from './visualizar-filme/visualizar-filme.page';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { FilmesFavoritosPage } from './filmes-favoritos/filmes-favoritos.page';
import { FilmesAssistidosPage } from './filmes-assistidos/filmes-assistidos.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule
  ],
  declarations: [
    Tab2Page,
    VisualizarFilmePage,
    FilmesFavoritosPage,
    FilmesAssistidosPage
  ]
})
export class Tab2PageModule {}
