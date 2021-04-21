import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualizarSeriadoPage } from './visualizar-seriado/visualizar-seriado.page';
import { VisualizarTemporadaPage } from './visualizar-temporada/visualizar-temporada.page';
import { SeriadosAssistidosPage } from './seriados-assistidos/seriados-assistidos.page';
import { SeriadosFavoritosPage } from './seriados-favoritos/seriados-favoritos.page';

const routes: Routes = [
  {
    path: 'visualizar-seriado/:id',
    component: VisualizarSeriadoPage
  },
  {
    path: 'seriados-favoritos',
    component: SeriadosFavoritosPage
  },
  {
    path: 'seriados-assistidos',
    component: SeriadosAssistidosPage
  },
  {
    path: 'visualizar-temporada/:id/:temp',
    component: VisualizarTemporadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeriadosPageRoutingModule {}
