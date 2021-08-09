import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyticsPage } from './analytics.page';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsPage,
    children: [
      {
        path: 'inicio',
        loadChildren: () =>
          import('./inicio/inicio.module').then((m) => m.InicioPageModule),
      },
      {
        path: 'cxc',
        loadChildren: () =>
          import('./cxc/cxc.module').then((m) => m.CxcPageModule),
      },

      {
        path: 'compras',
        loadChildren: () =>
          import('./compras/compras.module').then((m) => m.ComprasPageModule),
      },

      {
        path: 'finanzas',
        loadChildren: () =>
          import('./finanzas/finanzas.module').then(
            (m) => m.FinanzasPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'cxc',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'ventas',
    loadChildren: () =>
      import('./ventas/ventas.module').then((m) => m.VentasPageModule),
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsPageRoutingModule {}
