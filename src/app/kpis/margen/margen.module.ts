import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MargenPage } from './margen.page';
import { CommonUiCoreModule } from '@papx/common/ui-core';
import { KpiSharedUiModule } from '../shared/ui-kpi.module';
import { KpiMargenDetailComponent } from './components/kpi-marget-detail.component';

@NgModule({
  imports: [
    CommonUiCoreModule,
    KpiSharedUiModule,
    RouterModule.forChild([
      {
        path: '',
        component: MargenPage,
      },
    ]),
  ],
  declarations: [MargenPage, KpiMargenDetailComponent],
})
export class MargenPageModule {}
