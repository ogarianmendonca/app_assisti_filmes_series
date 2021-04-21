import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmesAssistidosPage } from './filmes-assistidos/filmes-assistidos.page';
import { FilmesFavoritosPage } from './filmes-favoritos/filmes-favoritos.page';
import { VisualizarFilmePage } from './visualizar-filme/visualizar-filme.page';

const routes: Routes = [
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
export class FilmesPageRoutingModule {}
