import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFireStorage } from '@angular/fire/storage';

import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import toNumber from 'lodash-es/toNumber';
import assign from 'lodash-es/assign';

import { KpiVentas } from '@papx/models';

@Injectable({ providedIn: 'root' })
export class BiDataService {
  constructor(private http: HttpClient, private fs: AngularFireStorage) {}

  fetchVentasPorSemana(id: number): Observable<KpiVentas[]> {
    return this.fs
      .ref('bi/ventas-sem-bi.json')
      .getDownloadURL()
      .pipe(
        switchMap((url) =>
          this.http.get<any[]>(url).pipe(
            map((rows) => rows.filter((i) => toNumber(i.calendario_id) === id)),
            map((rows) => {
              return rows.map((item) => assign(new KpiVentas(), item));
            })
          )
        ),
        // tap((ventas) => {
        //   const res: KpiVentas = assign(new KpiVentas(), ventas[0]);
        //   console.log('Res_ ', res);
        //   console.log('Vta: ', res instanceof KpiVentas);
        //   console.log('Precio por kilo: ', res.precioPorKilo);
        // }),
        catchError((err) =>
          throwError('Error descargando ventas semanales ' + err.message)
        )
      );
  }
}
