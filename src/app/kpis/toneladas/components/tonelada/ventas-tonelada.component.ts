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
  selector: 'papx-kpi-ventas-por-tonelada',
  templateUrl: 'ventas-tonelada.component.html',
  styleUrls: ['ventas-tonelada.component.scss'],
})
export class KpiVentasPorToneladaComponent implements OnInit, AfterViewInit {
  @Input() tipo: 'SEM' | 'MES' | 'ANIO';
  @Input() semana: Semana;

  _ventas: KpiVentas[] = [];
  porTipo;
  totalPorSegmento = 0;
  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;
  private doughnutChart: Chart;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => this.buildDoughnutChart(), 600);
  }

  @Input()
  set ventas(value: KpiVentas[]) {
    if (this._ventas) {
      this._ventas = value.filter((i) => i.tipo === this.tipo);

      this.totalPorSegmento = round(sumBy(this._ventas, 'toneladas'), 2);
      const contado = new KpiVentas();
      contado.tipo = this.tipo;
      contado.sucursal = 'CON';
      contado.toneladas = sumBy(this._ventas, 'toneladas_con');
      contado.venta = sumBy(this._ventas, 'venta_con');
      const credito = new KpiVentas();
      credito.tipo = this.tipo;
      credito.sucursal = 'CRE';
      credito.toneladas = sumBy(this._ventas, 'toneladas_cre');
      credito.venta = sumBy(this._ventas, 'venta_cre');

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
