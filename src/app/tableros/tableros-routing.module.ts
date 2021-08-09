import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablerosPage } from './tableros.page';

const routes: Routes = [
  {
    path: '',
    component: TablerosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablerosPageRoutingModule {}
