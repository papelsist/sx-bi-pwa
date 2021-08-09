import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CxcPageRoutingModule } from './cxc-routing.module';

import { CxcPage } from './cxc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CxcPageRoutingModule
  ],
  declarations: [CxcPage]
})
export class CxcPageModule {}
