import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonUiCoreModule } from '@papx/common/ui-core';
import { KpiSharedUiModule } from '../shared/ui-kpi.module';
import { KpiTiketsDetailComponent } from './components/tickets-detail.component';
import { TicketPage } from './ticket.page';

@NgModule({
  imports: [
    CommonUiCoreModule,
    KpiSharedUiModule,
    RouterModule.forChild([
      {
        path: '',
        component: TicketPage,
      },
    ]),
  ],
  declarations: [TicketPage, KpiTiketsDetailComponent],
})
export class TicketPageModule {}
