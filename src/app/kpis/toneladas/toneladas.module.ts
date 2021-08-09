import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToneladasPage } from './toneladas.page';
import { CommonUiCoreModule } from '@papx/common/ui-core';
import { KpiSharedUiModule } from '../shared/ui-kpi.module';
import { KpiVentasPorToneladaComponent } from './components/tonelada/ventas-tonelada.component';
import { KpiVentasImporteComponent } from './components/ventas-importe.component';
import { KpiVentasTicketCompone } from './components/ventas-ticket.component';
import { KpiValesDescuentoCompone } from './components/vales-descuento.component';

const routes: Routes = [
  {
    path: '',
    component: ToneladasPage,
  },
];

@NgModule({
  imports: [
    CommonUiCoreModule,
    KpiSharedUiModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ToneladasPage,
    KpiVentasPorToneladaComponent,
    KpiVentasImporteComponent,
    KpiVentasTicketCompone,
    KpiValesDescuentoCompone,
  ],
})
export class ToneladasPageModule {}
