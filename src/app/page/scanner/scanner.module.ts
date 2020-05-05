import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { HideKeyboardModule } from 'hide-keyboard';
import { IonicModule } from '@ionic/angular';

import { ScannerPage } from './scanner.page';

const routes: Routes = [
  {
    path: '',
    component: ScannerPage
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
  declarations: [ScannerPage]
})
export class ScannerPageModule {}
