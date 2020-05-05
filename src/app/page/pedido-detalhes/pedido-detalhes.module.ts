import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { HideKeyboardModule } from 'hide-keyboard';
import { IonicModule } from '@ionic/angular';

import { PedidoDetalhesPage } from './pedido-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoDetalhesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    HideKeyboardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PedidoDetalhesPage]
})
export class PedidoDetalhesPageModule {}
