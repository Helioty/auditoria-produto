import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './page/login/login.module#LoginPageModule'
  },
  {
    path: 'scanner',
    loadChildren: './page/scanner/scanner.module#ScannerPageModule'
  },
  {
    path: 'pedido-detalhes',
    loadChildren: './page/pedido-detalhes/pedido-detalhes.module#PedidoDetalhesPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
