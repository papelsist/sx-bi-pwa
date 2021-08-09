import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { KpiDataService } from '../@data-access/services/kpi-data.service';
import { Semana } from '../@models/kpi';

export interface State {
  semanas: Semana[];
  selectedId: number | null;
}
let _current: State = {
  semanas: [],
  selectedId: null,
};

@Injectable({ providedIn: 'root' })
export class KpiFacade {
  private store = new BehaviorSubject<State>(_current);
  state$ = this.store.asObservable();
  semanas2$ = this.state$.pipe(
    map((state) => state.semanas),
    distinctUntilChanged()
  );
  readonly semanas$ = this.service.semanas$;
  private current = new BehaviorSubject<Semana>(this.getDemoSemana());
  readonly current$ = this.current.asObservable().pipe(distinctUntilChanged());

  puntos$ = this.service.config$.pipe(
    map((rows) =>
      rows.find((i) => i.tipo === 'calificacion' && i.unidad === 'puntos')
    ),
    map((row) => row.valor)
  );
  porcentaje$ = this.service.config$.pipe(
    map((rows) =>
      rows.find((i) => i.tipo === 'calificacion' && i.unidad === 'porcentaje')
    ),
    map((row) => row.valor)
  );

  resumen$ = combineLatest([
    this.puntos$,
    this.porcentaje$,
    this.current$,
  ]).pipe(
    map(([puntuacion, porcentaje, s]) => {
      const pc = porcentaje / 100;
      const total = s.dias_lab_sem + s.dias_lab_mes + s.dias_lab_year;
      const anual = (s.dias_lab_year / total) * puntuacion;
      const mensual = (s.dias_lab_mes / total) * puntuacion;
      const semanal = (s.dias_lab_sem / total) * puntuacion;
      return {
        anual,
        anualAlPorcentaje: anual * pc,
        mensual,
        mensualAlPorcentaje: mensual * pc,
        semanal,
        semanalAlPorcentaje: semanal * pc,
        total,
        puntuacion,
        puntuacionAlPorcentaje: puntuacion * pc,
        porcentaje: pc,
      };
    })
    // tap((res) => console.log('Resumen calculado: ', res))
  );

  toneladas$ = this.current$.pipe(
    switchMap((semana) =>
      this.service.toneladas$.pipe(
        // tap((tons) => console.log('Evaluando: ', tons, semana.id)),
        map((rows) =>
          rows.find((i) => parseInt(i.calendario_id.toString()) === semana.id)
        )
      )
    )
  );

  margen$ = this.current$.pipe(
    switchMap((semana) =>
      this.service
        .fetchMargen()
        .pipe(
          map((rows) =>
            rows.find((i) => parseInt(i.calendario_id.toString()) === semana.id)
          )
        )
    )
  );

  inventario$ = this.current$.pipe(
    switchMap((semana) =>
      this.service
        .fetchInventario()
        .pipe(
          map((rows) =>
            rows.find((i) => parseInt(i.calendario_id.toString()) === semana.id)
          )
        )
    )
  );

  tickets$ = this.current$.pipe(
    switchMap((semana) =>
      this.service
        .fetchTickets()
        .pipe(
          map((rows) =>
            rows.find((i) => parseInt(i.calendario_id.toString()) === semana.id)
          )
        )
    )
  );

  precio$ = this.current$.pipe(
    switchMap((semana) =>
      this.service
        .fetchPrecio()
        .pipe(
          map((rows) =>
            rows.find((i) => parseInt(i.calendario_id.toString()) === semana.id)
          )
        )
    )
  );

  cxc$ = this.current$.pipe(
    switchMap((semana) =>
      this.service
        .fetchTickets()
        .pipe(
          map((rows) =>
            rows.find((i) => parseInt(i.calendario_id.toString()) === semana.id)
          )
        )
    )
  );

  constructor(private service: KpiDataService) {}

  setSemana(semana: Semana) {
    this.current.next(semana);
  }

  getDemoSemana(): Semana {
    return {
      calificacion: 0,
      cuatrimestre: 1,
      dias_acumulados_mes: 29,
      dias_acumulados_year: 89,
      dias_lab_mes: 23,
      dias_lab_sem: 6,
      dias_lab_year: 73,
      dias_mes: 31,
      dias_sem: 7,
      dias_year: 366,
      dom_mes: 5,
      ejercicio: 2020,
      fecha_final: '2020-03-29T06:00:00+0000',
      fecha_inicial: '2020-03-23T06:00:00+0000',
      fest_mes: 1,
      fest_sem: 0,
      fest_year: 3,
      id: 727,
      mes: 3,
      semana: 13,
      semestre: 1,
      trimestre: 1,
    };
  }
}
