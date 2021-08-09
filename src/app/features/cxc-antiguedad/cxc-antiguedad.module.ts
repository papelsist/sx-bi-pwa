import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CommonUiCoreModule } from '@papx/common/ui-core';
import { CxcAntiguedadPage } from './cxc-antiguedad.page';
import { AS_COMPONENTS } from './components';
import { AntiguedadFacade } from './antiguedad.facade';

const routes: Routes = [
  {
    path: '',
    component: CxcAntiguedadPage,
  },
];

@NgModule({
  imports: [FormsModule, CommonUiCoreModule, RouterModule.forChild(routes)],
  declarations: [CxcAntiguedadPage, ...AS_COMPONENTS],
  providers: [AntiguedadFacade],
})
export class CxcAntiguedadPageModule {}
