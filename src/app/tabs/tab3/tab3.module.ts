import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { Tab3PageRoutingModule } from './tab3-routing.module'
import { VisualizarSeriadoPage } from './visualizar-seriado/visualizar-seriado.page';
import { VisualizarTemporadaPage } from './visualizar-temporada/visualizar-temporada.page';
import { SeriadosAssistidosPage } from './seriados-assistidos/seriados-assistidos.page';
import { SeriadosFavoritosPage } from './seriados-favoritos/seriados-favoritos.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
  ],
  declarations: [
    Tab3Page,
    VisualizarSeriadoPage,
    SeriadosFavoritosPage,
    SeriadosAssistidosPage,
    VisualizarTemporadaPage
  ]
})
export class Tab3PageModule {}
