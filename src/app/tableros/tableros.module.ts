import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablerosPageRoutingModule } from './tableros-routing.module';

import { TablerosPage } from './tableros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablerosPageRoutingModule
  ],
  declarations: [TablerosPage]
})
export class TablerosPageModule {}
