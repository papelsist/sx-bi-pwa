import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KpisPage } from './kpis.page';

const routes: Routes = [
  {
    path: '',
    component: KpisPage
  },
  {
    path: 'toneladas',
    loadChildren: () => import('./toneladas/toneladas.module').then( m => m.ToneladasPageModule)
  },
  {
    path: 'margen',
    loadChildren: () => import('./margen/margen.module').then( m => m.MargenPageModule)
  },
  {
    path: 'precio',
    loadChildren: () => import('./precio/precio.module').then( m => m.PrecioPageModule)
  },
  {
    path: 'ticket',
    loadChildren: () => import('./ticket/ticket.module').then( m => m.TicketPageModule)
  },
  {
    path: 'inventario',
    loadChildren: () => import('./inventario/inventario.module').then( m => m.InventarioPageModule)
  },
  {
    path: 'cxc',
    loadChildren: () => import('./cxc/cxc.module').then( m => m.CxcPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KpisPageRoutingModule {}
