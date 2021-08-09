import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonUiCoreModule } from '@papx/common/ui-core';
import { KpiSharedUiModule } from '../shared/ui-kpi.module';
import { KpiPrecioKiloDetailComponent } from './precio-kg-detail/precio-kg-detail.component';
import { PrecioPage } from './precio.page';

@NgModule({
  imports: [
    CommonUiCoreModule,
    KpiSharedUiModule,
    RouterModule.forChild([
      {
        path: '',
        component: PrecioPage,
      },
    ]),
  ],
  declarations: [PrecioPage, KpiPrecioKiloDetailComponent],
})
export class PrecioPageModule {}
