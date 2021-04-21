import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilPage } from './perfil/perfil.page';

const routes: Routes = [
  {
    path: 'perfil',
    component: PerfilPage,
  },
  {
    path: 'filmes',
    loadChildren: () => import('../pages/filmes/filmes.module').then(m => m.FilmesModule)
  },
  {
    path: 'seriados',
    loadChildren: () => import('../pages/seriados/seriados.module').then(m => m.SeriadosModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
