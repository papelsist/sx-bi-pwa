import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { KpiVentas, Semana } from '@papx/models';

import sumBy from 'lodash-es/sumBy';

@Component({
  selector: 'papx-kpi-vales-descuento',
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
            <ion-col>Sols</ion-col>
            <ion-col>Sol(Ton)</ion-col>
            <ion-col>Atd</ion-col>
            <ion-col>Atd(Ton)</ion-col>
            <ion-col>Desto Fac</ion-col>
            <ion-col>Desto Real</ion-col>
          </ion-row>
          <ion-row *ngFor="let x of ventas">
            <ion-col sucursal size="2">{{
              getSucursalLabel(x.sucursal)
            }}</ion-col>
            <ion-col> {{ x.vales_solicito }}</ion-col>
            <ion-col> {{ x.ton_solicito }}</ion-col>
            <ion-col> {{ x.vales_atendio }}</ion-col>
            <ion-col> {{ x.ton_atendio }}</ion-col>
            <ion-col>
              {{ x.descto_fac }}
            </ion-col>
            <ion-col>
              {{ x.descto_real }}
            </ion-col>
          </ion-row>
          <!-- Por tipo de venta -->
          <ion-item-divider>Por tipo de venta</ion-item-divider>
          <ion-row *ngFor="let x of porTipo" por-tipo>
            <ion-col sucursal>{{ x.sucursal }}</ion-col>
            <ion-col> </ion-col>
            <ion-col> </ion-col>
            <ion-col>{{ x.descto_fac | number: '1.2-2' }} </ion-col>
            <ion-col>{{ x.descto_real | number: '1.2-2' }} </ion-col>
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
export class KpiValesDescuentoCompone implements OnInit, AfterViewInit {
  @Input() tipo: 'SEM' | 'MES' | 'ANIO';
  @Input() semana: Semana;

  _ventas: KpiVentas[] = [];
  porTipo;

  totalPorSemana = 0;

  constructor() {}

  ngOnInit() {
    console.log('Vtas: ', this._ventas);
  }

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

      const importeFacCon = sumBy(this._ventas, 'importe_fac_con');
      const ventaCon = sumBy(this._ventas, 'venta_con');
      const difCon = importeFacCon - ventaCon;
      const resCon = (difCon * 100.0) / importeFacCon;
      // console.log(
      //   'ImporteFacCon: %f VentaCon: %f Dif: %f Res: %f',
      //   importeFacCon,
      //   ventaCon,
      //   difCon,
      //   resCon
      // );
      const dfacCon = resCon;

      contado.descto_fac = dfacCon;

      const dRealCon =
        ((sumBy(this._ventas, 'imp_bruto_con') -
          sumBy(this._ventas, 'venta_con')) *
          100) /
        sumBy(this._ventas, 'imp_bruto_con');
      contado.descto_real = dRealCon;

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

      const dfacCre =
        ((sumBy(this._ventas, 'importe_fac_cre') -
          sumBy(this._ventas, 'venta_cre')) *
          100) /
        sumBy(this._ventas, 'importe_fac_cre');
      credito.descto_fac = dfacCre;

      const dRealCre =
        ((sumBy(this._ventas, 'imp_bruto_cre') -
          sumBy(this._ventas, 'venta_cre')) *
          100) /
        sumBy(this._ventas, 'imp_bruto_cre');
      credito.descto_real = dRealCre;

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
