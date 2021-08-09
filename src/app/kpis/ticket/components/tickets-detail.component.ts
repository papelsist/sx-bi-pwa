import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { KpiVentas, Semana } from '@papx/models';

import sumBy from 'lodash-es/sumBy';
import round from 'lodash-es/round';

import { Chart } from 'chart.js';

@Component({
  selector: 'papx-kpi-tickets-detail',
  template: `
    <ion-card>
      <ion-card-header color="light">
        <ion-card-title>
          {{ getTitle() }}
        </ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-grid>
          <ion-row class="row-header">
            <ion-col size="2">Suc</ion-col>
            <ion-col>Part</ion-col>
            <ion-col>Facs</ion-col>
            <ion-col>Devs</ion-col>
            <ion-col>Canc</ion-col>
            <ion-col>Tick</ion-col>
            <ion-col>DvCn%</ion-col>
          </ion-row>
          <ion-row *ngFor="let x of ventas">
            <ion-col sucursal size="2">{{
              getSucursalLabel(x.sucursal)
            }}</ion-col>
            <ion-col size="1">
              {{ x.partidas / x.facturas | number: '1.0-2' }}</ion-col
            >
            <ion-col> {{ x.facturas }}</ion-col>
            <ion-col>
              {{ x.devoluciones }}
            </ion-col>
            <ion-col>
              {{ x.canceladas }}
            </ion-col>
            <ion-col>{{ x.venta / x.facturas | number: '1.0-0' }}</ion-col>
            <ion-col>
              {{
                (x.devoluciones + x.canceladas) / x.facturas | percent: '1.0-2'
              }}
            </ion-col>
          </ion-row>
          <!-- Por tipo de venta -->
          <ion-item-divider>Por tipo de venta</ion-item-divider>
          <ion-row *ngFor="let x of porTipo" por-tipo>
            <ion-col sucursal>{{ x.sucursal }}</ion-col>
            <ion-col> {{ x.partidas | number: '1.0-2' }} </ion-col>
            <ion-col> {{ x.facturas | number: '1.0-0' }}</ion-col>
            <ion-col> {{ x.devoluciones }}</ion-col>
            <ion-col>{{ x.canceladas }}</ion-col>
            <ion-col>{{ x.tikets | number: '1.0-0' }}</ion-col>
            <ion-col>{{
              (x.devoluciones + x.canceladas) / x.facturas | percent: '1.0-2'
            }}</ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-content>
    </ion-card>
  `,
  styles: [
    `
      .row-header {
        border-bottom: solid 0.5px gray;
        color: var(--ion-color-primary);
        border-bottom: solid 0.5px gray;
        font-style: bold;
      }

      ion-row {
        font-size: 1rem;
        border-bottom: solid 0.5px gray;
      }
      ion-col {
        font-size: 0.9rem;
        text-align: end;
      }
      ion-col[sucursal] {
        text-align: start;
      }
      ion-row[por-tipo] {
        font-style: italic;
        color: var(--ion-color-secondary);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiTiketsDetailComponent implements OnInit, AfterViewInit {
  @Input() tipo: 'SEM' | 'MES' | 'ANIO';
  @Input() semana: Semana;

  _ventas: KpiVentas[] = [];
  porTipo;

  totalPorSemana = 0;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {}

  @Input()
  set ventas(value: KpiVentas[]) {
    this._ventas = value;
    if (this._ventas) {
      this._ventas = value.filter((i) => i.tipo === this.tipo);

      const contado = new KpiVentas();
      contado.tipo = this.tipo;
      contado.sucursal = 'CON';
      contado.venta = sumBy(this._ventas, 'venta_con');
      contado.partidas = sumBy(this._ventas, 'partidas');
      contado.facturas = sumBy(this._ventas, 'facturas_con');
      contado.devoluciones = sumBy(this._ventas, 'devoluciones_con');
      contado.canceladas = sumBy(this._ventas, 'canceladas_con');
      contado.tikets = contado.venta / contado.facturas;
      contado.partidas = contado.partidas / contado.facturas;

      const credito = new KpiVentas();
      credito.tipo = this.tipo;
      credito.sucursal = 'CRE';
      credito.venta = sumBy(this._ventas, 'venta_cre');
      credito.partidas = sumBy(this._ventas, 'partidas');
      credito.facturas = sumBy(this._ventas, 'facturas_cre');
      credito.devoluciones = sumBy(this._ventas, 'devoluciones_cre');
      credito.canceladas = sumBy(this._ventas, 'canceladas_cre');
      credito.tikets = credito.venta / credito.facturas;
      credito.partidas = credito.partidas / credito.facturas;

      this.porTipo = [contado, credito];
      console.log('Acumulados por tipo: ', this.porTipo);
    }
  }
  get ventas() {
    return this._ventas;
  }

  getSucursalLabel(val: string) {
    switch (val) {
      case 'ANDRADE':
        return 'Andrade';

      case 'BOLIVAR':
        return 'Bolivar';

      case 'CALLE 4':
        return 'Calle4';

      case 'CF5FEBRERO':
        return '5Feb';

      case 'TACUBA':
        return 'Tacuba';
      default:
        return val;
    }
  }

  getTitle() {
    const t = this.tipo;
    const { semana, mes, ejercicio } = this.semana;
    return t === 'SEM'
      ? `Semana ${semana} (${ejercicio})`
      : t === 'MES'
      ? `Mes ${mes} (${ejercicio})`
      : `Ejericio ${ejercicio}`;
  }
}
