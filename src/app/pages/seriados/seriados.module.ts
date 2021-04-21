import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriadosComponent } from './seriados.component';
import { VisualizarSeriadoPage } from './visualizar-seriado/visualizar-seriado.page';
import { SeriadosFavoritosPage } from './seriados-favoritos/seriados-favoritos.page';
import { SeriadosAssistidosPage } from './seriados-assistidos/seriados-assistidos.page';
import { VisualizarTemporadaPage } from './visualizar-temporada/visualizar-temporada.page';
import { SeriadosPageRoutingModule } from './seriados-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SeriadosPageRoutingModule,
    IonicModule,
    FormsModule,
  ],
  declarations: [
    SeriadosComponent,
    VisualizarSeriadoPage,
    SeriadosFavoritosPage,
    SeriadosAssistidosPage,
    VisualizarTemporadaPage
  ]
})
export class SeriadosModule { }
