import { NgModule } from '@angular/core';
import { CommonUiCoreModule } from '@papx/common/ui-core';
import { KpiCalendarioPickerComponent } from './calendario-picker/kpi-calendario-picker.component';
import { KpiHeaderComponent } from './kpi-header.component';

@NgModule({
  imports: [CommonUiCoreModule],
  exports: [KpiHeaderComponent, KpiCalendarioPickerComponent],
  declarations: [KpiHeaderComponent, KpiCalendarioPickerComponent],
  providers: [],
})
export class KpiSharedUiModule {}
