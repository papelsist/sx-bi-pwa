import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { Semana } from '../@models/kpi';
import { KpiFacade } from './kpi.facade';

@Component({
  selector: 'app-kpis',
  templateUrl: './kpis.page.html',
  styleUrls: ['./kpis.page.scss'],
})
export class KpisPage implements OnInit {
  title = 'PapelSA BI KPIs';
  fecha = new Date().toISOString();
  indicadores = [
    {
      nombre: 'Toneladas',
      descripcion: 'Descripcion corta del indicador de toneladas',
      path: 'toneladas',
      data$: this.facade.toneladas$,
      kpi: 2.5,
      variacion: 0.1,
    },
    {
      nombre: 'Margen',
      descripcion: 'Descripcion corta del indicador de Margen',
      path: 'margen',
      data$: this.facade.margen$,
      kpi: 1.3,
      variacion: 0.0,
    },
    {
      nombre: 'Precio por Kilo',
      descripcion: 'Descripcion corta del indicador de Precio',
      path: 'precio',
      kpi: 2.5,
      variacion: 0.1,
    },
    {
      nombre: 'Ticket de Venta',
      descripcion: 'Descripcion corta del indicador de Ticket',
      path: 'ticket',
      kpi: 4.0,
      variacion: -0.014,
    },
    {
      nombre: 'Inventario',
      descripcion: 'Descripcion corta del indicador de Inventario',
      path: 'inventario',
      data$: this.facade.inventario$,
      kpi: 0.45,
      variacion: 0.01,
    },
    {
      nombre: 'Cuentas por cobrar',
      descripcion: 'Descripcion corta del indicador de Cuentas por cobrar',
      path: 'cxc',
      kpi: 1.5,
      variacion: 0.01,
    },
  ];

  semanas$ = this.facade.semanas$;
  current$ = this.facade.current$;
  resumen$ = this.facade.resumen$;
  toneladas$ = this.facade.toneladas$;
  margen$ = this.facade.margen$;

  vm$ = combineLatest([this.semanas$, this.current$, this.resumen$]).pipe(
    map(([semanas, current, resumen]) => ({ semanas, current, resumen }))
  );

  constructor(public facade: KpiFacade) {}

  ngOnInit() {
    this.margen$.subscribe((margen) => console.log('Margen data: ', margen));
  }

  setSemana(semana: Semana) {
    this.facade.setSemana(semana);
  }

  getKpiColor(kpi: number, puntuacion: number, porcentaje: number) {
    const ref = puntuacion * porcentaje;
    return kpi >= puntuacion ? 'success' : kpi >= ref ? 'warning' : 'danger';
  }
}
