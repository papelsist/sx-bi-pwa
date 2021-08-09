import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CxcPage } from './cxc.page';

const routes: Routes = [
  {
    path: '',
    component: CxcPage,
  },
  {
    path: 'antiguedad',
    loadChildren: () =>
      import('../../features/cxc-antiguedad/cxc-antiguedad.module').then(
        (m) => m.CxcAntiguedadPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CxcPageRoutingModule {}
