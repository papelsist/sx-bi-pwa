import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SortKeys } from '@papx/models';

@Component({
  selector: 'papx-as-toolbar',
  template: `
    <div class="as-toolbar">
      <ion-searchbar
        #searchBar
        placeholder="Buscar"
        class="ion-text-uppercase"
        (ionChange)="searchChange.emit(searchBar.value)"
      ></ion-searchbar>
      <div class="options">
        <ion-item class="sort">
          <ion-label position="floating">Ordenar:</ion-label>
          <ion-select
            placeholder="Orden"
            [value]="sort"
            (ionChange)="sortChange.emit(select.value)"
            ([value])="(sort)"
            #select
            okText="Aceptar"
            cancelText="Cancelar"
          >
            <ion-select-option
              *ngFor="let item of sortOptions"
              [value]="item.key"
            >
              {{ item.label }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item class="order">
          <ion-label position="floating">Tipo:</ion-label>
          <ion-select
            placeholder="Tipo"
            #orden
            [value]="order"
            (ionChange)="orderChange.emit(orden.value)"
          >
            <ion-select-option value="asc">Ascendente</ion-select-option>
            <ion-select-option value="desc">Descendente</ion-select-option>
          </ion-select>
        </ion-item>
      </div>
    </div>
  `,
  styles: [
    `
      .as-toolbar {
        display: grid;
        align-items: center;
        justify-content: start;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 5px;
        padding: 0 10px 5px;
      }
      .options {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 5px;
      }
      .sort {
        flex: 1 0 auto;
      }
      .order {
        flex: 1 0 auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsToolbarComponent {
  @Input() sort: SortKeys = 'saldo';
  @Input() order: 'asc' | 'desc' = 'desc';
  @Input() search = '';
  @Output() orderChange = new EventEmitter();
  @Output() sortChange = new EventEmitter();
  @Output() searchChange = new EventEmitter();
  sortOptions: { key: SortKeys; label: string }[] = [
    { key: 'saldo', label: 'Saldo' },
    { key: 'vencido', label: 'Vencido' },
    { key: 'porVencer', label: 'Por vencer' },
  ];
  constructor() {}
}
