import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, shareReplay, take, tap, withLatestFrom } from 'rxjs/operators';

import sortBy from 'lodash-es/sortBy';
import reverse from 'lodash-es/reverse';
import sumBy from 'lodash-es/sumBy';
import {
  AntiguedadPorCliente,
  AntiguedadSummary,
  SortKeys,
} from '@papx/models';

@Injectable()
export class AntiguedadFacade {
  private filter = new BehaviorSubject<string>('');
  filter$ = this.filter.asObservable();

  private sort = new BehaviorSubject<SortKeys>('saldo');
  sort$ = this.sort.asObservable();
  private order = new BehaviorSubject<'asc' | 'desc'>('desc');
  order$ = this.order.asObservable();

  antiguedad$ = this.afs
    .collection('analytics_asaldos', (ref) =>
      ref.orderBy('participacion', 'desc').limit(5)
    )
    .valueChanges<any>({ idField: 'id' })
    .pipe(take(1), shareReplay(1));

  filteredList$ = combineLatest([
    this.filter$,
    this.antiguedad$,
    this.sort$,
    this.order,
  ]).pipe(
    map(([term, rows, sort, order]) => {
      let sortedRows = sortBy(rows, sort.toString());
      sortedRows = order === 'desc' ? reverse(sortedRows) : sortedRows;
      return !term
        ? sortedRows
        : sortedRows.filter((item) =>
            item.cliente.toLowerCase().includes(term.toLowerCase())
          );
    })
  );

  sumary$: Observable<AntiguedadSummary> = this.antiguedad$.pipe(
    map((rows) => ({
      total: sumBy(rows, 'saldo'),
      vencido: sumBy(rows, 'vencido'),
      porVencer: sumBy(rows, 'porVencer'),
      de1_30: sumBy(rows, 'de1_30'),
      de31_60: sumBy(rows, 'de31_60'),
      de61_90: sumBy(rows, 'de61_90'),
      mas90: sumBy(rows, 'mas90'),
      facturas: sumBy(rows, 'facturas'),
    }))
  );

  constructor(private afs: AngularFirestore) {}

  setFilter(term: string) {
    this.filter.next(term);
  }
  setSort(key: SortKeys) {
    this.sort.next(key);
  }
  setOrder(ord: 'asc' | 'desc') {
    this.order.next(ord);
  }
}
