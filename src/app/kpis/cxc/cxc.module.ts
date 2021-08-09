import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonUiCoreModule } from '@papx/common/ui-core';
import { CxcPage } from './cxc.page';
import { KpiSharedUiModule } from '../shared/ui-kpi.module';

@NgModule({
  imports: [
    CommonUiCoreModule,
    KpiSharedUiModule,
    RouterModule.forChild([
      {
        path: '',
        component: CxcPage,
      },
    ]),
  ],
  declarations: [CxcPage],
})
export class CxcPageModule {}
