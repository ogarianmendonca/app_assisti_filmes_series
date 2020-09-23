import { VisualizarFilmePage } from './visualizar-filme/visualizar-filme.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { FilmesFavoritosPage } from './filmes-favoritos/filmes-favoritos.page';
import { FilmesAssistidosPage } from './filmes-assistidos/filmes-assistidos.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'visualizar-filme/:id',
    component: VisualizarFilmePage
  },
  {
    path: 'filmes-favoritos',
    component: FilmesFavoritosPage
  },
  {
    path: 'filmes-assistidos',
    component: FilmesAssistidosPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
