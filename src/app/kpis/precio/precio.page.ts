import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BiDataService } from 'src/app/@data-access/services/bi-data.service';
import { KpiFacade } from '../kpi.facade';

@Component({
  selector: 'app-precio',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <papsx-kpi-header title="Precio por Kilo"></papsx-kpi-header>
      <ion-content class="ion-padding" *ngIf="vm.margen as kp">
        <ion-grid class="table">
          <ion-row class="row-header">
            <ion-col
              *ngFor="
                let c of [
                  'Tipo',
                  'Costo',
                  'Meta  (' + kp.meta_precioKg + ')',
                  'Diff',
                  '%'
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
              kp['costoKg_' + seg] | number: '1.2-2'
            }}</ion-col>
            <ion-col class="ion-text-end">{{
              kp['precioKg_' + seg] | number: '1.2-2'
            }}</ion-col>
            <ion-col class="ion-text-end">{{
              kp['diferencia_precioKg_' + seg] | number: '1.2-2'
            }}</ion-col>
            <ion-col class="ion-text-center">{{
              kp['desviacion_precioKg_' + seg] | percent: '1.1-1'
            }}</ion-col>
          </ion-row>

          <ion-row> </ion-row>
        </ion-grid>

        <div class="analisis" *ngIf="ventas$ | async as ventas">
          <papx-kpi-precio-kilo-detail
            tipo="SEM"
            [ventas]="ventas"
            [semana]="vm.semana"
          ></papx-kpi-precio-kilo-detail>
          <papx-kpi-precio-kilo-detail
            tipo="MES"
            [ventas]="ventas"
            [semana]="vm.semana"
          ></papx-kpi-precio-kilo-detail>
          <papx-kpi-precio-kilo-detail
            tipo="ANIO"
            [ventas]="ventas"
            [semana]="vm.semana"
          ></papx-kpi-precio-kilo-detail>
        </div>
      </ion-content>

      <ion-footer>
        <ion-toolbar>
          <ion-title size="small"> KPIs Papel S.A.</ion-title>
        </ion-toolbar>
      </ion-footer>
    </ng-container>
  `,
  styleUrls: ['./precio.page.scss'],
})
export class PrecioPage implements OnInit {
  current$ = this.facade.current$;
  resumen$ = this.facade.resumen$;
  margen$ = this.facade.precio$;
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
