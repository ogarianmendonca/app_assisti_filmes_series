import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPrincipalComponent } from './card-principal/card-principal.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  declarations: [
    CardPrincipalComponent,
    HeaderComponent
  ],
  exports: [
    CardPrincipalComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
