import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonUiCoreModule } from '@papx/common/ui-core';
import { KpiSharedUiModule } from '../shared/ui-kpi.module';
import { InventarioPage } from './inventario.page';

@NgModule({
  imports: [
    CommonUiCoreModule,
    KpiSharedUiModule,
    RouterModule.forChild([
      {
        path: '',
        component: InventarioPage,
      },
    ]),
  ],
  declarations: [InventarioPage],
})
export class InventarioPageModule {}
