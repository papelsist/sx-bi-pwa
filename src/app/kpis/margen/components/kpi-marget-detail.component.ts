import {
  AfterViewInit,
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
  selector: 'papx-kpi-margen-detail',
  template: `
    <ion-card>
      <ion-card-header color="light">
        <ion-card-title>{{ getTitle() }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-grid>
          <ion-row class="row-header">
            <ion-col>Suc</ion-col>
            <ion-col>Venta</ion-col>
            <ion-col>Costo</ion-col>
            <ion-col class="ion-hide-sm-down">Util</ion-col>
            <ion-col class="ion-hide-sm-down">%</ion-col>
          </ion-row>
          <ion-row *ngFor="let x of ventas">
            <ion-col sucursal>{{ getSucursalLabel(x.sucursal) }}</ion-col>
            <ion-col> {{ x.venta | number: '1.0-0' }}</ion-col>
            <ion-col> {{ x.costo | number: '1.0-0' }}</ion-col>
            <ion-col class="ion-hide-sm-down">
              {{ x.utilidad | number: '1.0-0' }}
            </ion-col>
            <ion-col class="ion-hide-sm-down">
              {{ x.utilidad / x.venta | percent }}
            </ion-col>
          </ion-row>
          <!-- Por tipo de venta -->
          <ion-item-divider>Por tipo de venta</ion-item-divider>
          <ion-row *ngFor="let x of porTipo" por-tipo>
            <ion-col sucursal>{{ getSucursalLabel(x.sucursal) }}</ion-col>
            <ion-col size="3"> {{ x.venta | number: '1.0-0' }}</ion-col>
            <ion-col size="3"> {{ x.costo | number: '1.0-0' }}</ion-col>
            <ion-col class="ion-hide-sm-down">
              {{ x.utilidad | number: '1.0-0' }}
            </ion-col>
            <ion-col class="ion-hide-sm-down">
              {{ x.utilidad / x.venta | percent }}
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-grid class="ion-hide-sm-up">
          <ion-row class="row-header">
            <ion-col>Suc</ion-col>
            <ion-col>Utilidad</ion-col>
            <ion-col>%</ion-col>
          </ion-row>
          <ion-row *ngFor="let x of ventas">
            <ion-col sucursal>{{ getSucursalLabel(x.sucursal) }}</ion-col>
            <ion-col> {{ x.utilidad | number: '1.0-0' }} </ion-col>
            <ion-col>
              {{ x.utilidad / x.venta | percent }}
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-content>
    </ion-card>

    <ion-card>
      <ion-card-header>
        <ion-card-title> Márgen de utilidad</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <canvas #doughnutCanvas></canvas>
      </ion-card-content>
    </ion-card>
  `,
  styles: [
    `
      .row-header {
        border-bottom: solid 0.5px gray;
        // background-color: var(--ion-color-medium);
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
})
export class KpiMargenDetailComponent implements OnInit, AfterViewInit {
  @Input() tipo: 'SEM' | 'MES' | 'ANIO';
  @Input() semana: Semana;

  _ventas: KpiVentas[] = [];
  porTipo;
  totalPorSegmento = 0;

  totalPorSemana = 0;
  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;
  private doughnutChart: Chart;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => this.buildDoughnutChart(), 600);
  }

  @Input()
  set ventas(value: KpiVentas[]) {
    this._ventas = value;
    if (this._ventas) {
      this._ventas = value.filter((i) => i.tipo === this.tipo);

      this.totalPorSegmento = round(sumBy(this._ventas, 'venta'), 0);
      const contado = new KpiVentas();
      contado.tipo = this.tipo;
      contado.sucursal = 'CON';
      contado.venta = sumBy(this._ventas, 'venta_con');
      contado.costo = sumBy(this._ventas, 'costo_con');
      contado.utilidad = sumBy(this._ventas, 'utilidad_con');
      const credito = new KpiVentas();
      credito.tipo = this.tipo;
      credito.sucursal = 'CRE';
      credito.venta = sumBy(this._ventas, 'venta_cre');
      credito.costo = sumBy(this._ventas, 'costo_cre');
      credito.utilidad = sumBy(this._ventas, 'utilidad_cre');

      this.porTipo = [contado, credito];
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

  buildDoughnutChart() {
    const data = this.ventas.map((i) => ({
      sucursl: this.getSucursalLabel(i.sucursal),
      value: round(i.toneladas, 0),
    }));
    const tot = sumBy(data, 'value');
    const labels = data.map((r) => r.sucursl);
    const values = data.map((r) => round((r.value / tot) * 100));
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Toneladas',
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF6384',
              '#36A2EB',
            ],
          },
        ],
      },
    });
  }
}
