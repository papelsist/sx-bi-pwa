import { AsItemComponent } from './as-item/as-item.component';
import { AsListComponent } from './as-list/as-list.component';
import { AsOptionsComponent } from './as-options/as-options.component';
import { AsResumenComponent } from './as-resumen/as-resumen.component';
import { AsToolbarComponent } from './as-toolbar/as-toolbar.component';

export const AS_COMPONENTS: any[] = [
  AsResumenComponent,
  AsListComponent,
  AsItemComponent,
  AsToolbarComponent,
  AsOptionsComponent,
];

export * from './as-resumen/as-resumen.component';
export * from './as-list/as-list.component';
export * from './as-item/as-item.component';
export * from './as-toolbar/as-toolbar.component';
export * from './as-options/as-options.component';
