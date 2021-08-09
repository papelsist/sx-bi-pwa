import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BiDataService } from 'src/app/@data-access/services/bi-data.service';
import { KpiFacade } from '../kpi.facade';

@Component({
  selector: 'app-margen',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <papsx-kpi-header title="Margen"></papsx-kpi-header>
      <ion-content class="ion-padding" *ngIf="vm.margen as kp">
        <div class="header">
          <div class="kpi">
            <span>KPI:</span>
            <ion-text [color]="getColorKpi(vm)"> {{ kp?.kpi }} </ion-text>
          </div>
        </div>

        <ion-grid class="table">
          <ion-row class="row-header">
            <ion-col
              *ngFor="
                let c of [
                  'Tipo',
                  'Venta',
                  'Costo',
                  'Meta  (' + kp.meta_margen + '%)',
                  'Diff'
                ]
              "
              class="ion-text-center"
            >
              {{ c }}
            </ion-col>
          </ion-row>
          <ion-row *ngFor="let seg of ['semanal', 'mensual', 'anual']">
            <ion-col>{{ getTipo(seg) }}</ion-col>
            <ion-col class="ion-text-end">{{
              kp['venta_' + seg] | number: '1.0-0'
            }}</ion-col>
            <ion-col class="ion-text-end">{{
              kp['costo_' + seg] | number: '1.0-0'
            }}</ion-col>
            <ion-col class="ion-text-end">{{
              kp['porcentaje_ut_' + seg]
            }}</ion-col>
            <ion-col class="ion-text-center">{{
              kp['desviacion_ut_' + seg] | percent: '1.1-1'
            }}</ion-col>
          </ion-row>

          <ion-row> </ion-row>
        </ion-grid>

        <div class="analisis" *ngIf="ventas$ | async as ventas">
          <papx-kpi-margen-detail
            tipo="SEM"
            [ventas]="ventas"
            [semana]="vm.semana"
          ></papx-kpi-margen-detail>
          <papx-kpi-margen-detail
            tipo="MES"
            [ventas]="ventas"
            [semana]="vm.semana"
          ></papx-kpi-margen-detail>
          <papx-kpi-margen-detail
            tipo="ANIO"
            [ventas]="ventas"
            [semana]="vm.semana"
          ></papx-kpi-margen-detail>
        </div>
      </ion-content>

      <ion-footer>
        <ion-toolbar>
          <ion-title size="small"> KPIs Papel S.A.</ion-title>
        </ion-toolbar>
      </ion-footer>
    </ng-container>
  `,
  styleUrls: ['./margen.page.scss'],
})
export class MargenPage implements OnInit {
  current$ = this.facade.current$;
  resumen$ = this.facade.resumen$;
  margen$ = this.facade.margen$;
  vm$ = combineLatest([this.current$, this.resumen$, this.margen$]).pipe(
    map(([semana, resumen, margen]) => ({ semana, resumen, margen }))
  );

  ventas$ = this.current$.pipe(
    switchMap((s) => this.biData.fetchVentasPorSemana(s.id))
  );

  constructor(private facade: KpiFacade, private biData: BiDataService) {}

  ngOnInit() {
    // this.ventas$.subscribe((vtas) => console.log('Vtas: ', vtas));
    this.margen$.subscribe((r) => console.log('R: ', r));
  }

  getColor(vm: any) {
    const ref = vm.resumen.semanalAlPorcentaje;
    const valor = vm.margen.semanal_kpi;
    const total = vm.resumen.semanal;
    if (valor < ref) return 'danger';
    if (valor >= total) return 'success';
    return 'warning';
  }

  getColorKpi(vm: any) {
    const ref = vm.resumen.puntuacionAlPorcentaje;
    const valor = vm.margen.kpi;
    const total = vm.resumen.puntuacion;
    if (valor < ref) return 'danger';
    if (valor >= total) return 'success';
    return 'warning';
  }

  getTipo(data: string) {
    return data === 'semanal'
      ? 'Semana'
      : data === 'mensual'
      ? 'Mes'
      : data === 'anual'
      ? 'Año'
      : '';
  }
}
