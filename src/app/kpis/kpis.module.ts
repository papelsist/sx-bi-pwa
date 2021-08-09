import { NgModule } from '@angular/core';

import { KpisPageRoutingModule } from './kpis-routing.module';

import { KpisPage } from './kpis.page';
import { KpiSharedUiModule } from './shared/ui-kpi.module';
import { CommonUiCoreModule } from '@papx/common/ui-core';

@NgModule({
  imports: [CommonUiCoreModule, KpiSharedUiModule, KpisPageRoutingModule],
  declarations: [KpisPage],
})
export class KpisPageModule {}
