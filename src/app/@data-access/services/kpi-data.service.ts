import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFireStorage } from '@angular/fire/storage';

import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import sortBy from 'lodash-es/sortBy';
import reverse from 'lodash-es/reverse';
import { KpiConfig, KpiToneladas, Semana } from '@papx/models';

@Injectable({ providedIn: 'root' })
export class KpiDataService {
  semanas$ = this.fetchSemanas();
  config$ = this.fetchConfig();
  toneladas$ = this.fetchToneladas();
  constructor(private http: HttpClient, private fs: AngularFireStorage) {}

  fetchSemanas(): Observable<Semana[]> {
    return this.fs
      .ref('bi/calendarios-kpi.json')
      .getDownloadURL()
      .pipe(
        switchMap((url) => this.http.get<Semana[]>(url)),
        catchError((err) =>
          throwError('Error descargando calendarios ' + err.message)
        )
      );
  }

  fetchConfig(): Observable<KpiConfig[]> {
    return this.fs
      .ref('bi/kpi-config.json')
      .getDownloadURL()
      .pipe(
        switchMap((url) => this.http.get<KpiConfig[]>(url)),
        catchError((err) =>
          throwError('Error descargando kpi-config ' + err.message)
        )
      );
  }

  fetchToneladas(): Observable<KpiToneladas[]> {
    return this.fs
      .ref('bi/kpi-toneladas.json')
      .getDownloadURL()
      .pipe(
        switchMap((url) => this.http.get<KpiToneladas[]>(url)),
        catchError((err) =>
          throwError('Error descargando kpi-toneladas ' + err.message)
        )
      );
  }

  fetchMargen(): Observable<{ [key: string]: any }[]> {
    return this.fs
      .ref('bi/kpi-margen.json')
      .getDownloadURL()
      .pipe(
        switchMap((url) => this.http.get<{ [key: string]: any }[]>(url)),
        catchError((err) =>
          throwError('Error descargando kpi-margen ' + err.message)
        )
      );
  }

  fetchInventario(): Observable<{ [key: string]: any }[]> {
    return this.fs
      .ref('bi/kpi-precio.json')
      .getDownloadURL()
      .pipe(
        switchMap((url) => this.http.get<{ [key: string]: any }[]>(url)),
        catchError((err) =>
          throwError('Error descargando kpi-margen ' + err.message)
        )
      );
  }

  fetchPrecioKilo(): Observable<{ [key: string]: any }[]> {
    return this.fs
      .ref('bi/kpi-precio.json')
      .getDownloadURL()
      .pipe(
        switchMap((url) => this.http.get<{ [key: string]: any }[]>(url)),
        catchError((err) =>
          throwError('Error descargando kpi-margen ' + err.message)
        )
      );
  }

  fetchTickets(): Observable<{ [key: string]: any }[]> {
    return this.fs
      .ref('bi/kpi-ticket.json')
      .getDownloadURL()
      .pipe(
        switchMap((url) => this.http.get<{ [key: string]: any }[]>(url)),
        catchError((err) =>
          throwError('Error descargando kpi-margen ' + err.message)
        )
      );
  }

  fetchPrecio(): Observable<{ [key: string]: any }[]> {
    return this.fs
      .ref('bi/kpi-precio.json')
      .getDownloadURL()
      .pipe(
        switchMap((url) => this.http.get<{ [key: string]: any }[]>(url)),
        catchError((err) =>
          throwError('Error descargando kpi-margen ' + err.message)
        )
      );
  }

  fetchCxC(): Observable<{ [key: string]: any }[]> {
    return this.fs
      .ref('bi/kpi-ticket.json')
      .getDownloadURL()
      .pipe(
        switchMap((url) => this.http.get<{ [key: string]: any }[]>(url)),
        catchError((err) =>
          throwError('Error descargando kpi-margen ' + err.message)
        )
      );
  }
}
