import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { PickerController } from '@ionic/angular';

import { format } from 'date-fns';
import { parseJSON } from 'date-fns';
import es from 'date-fns/locale/es';

import { Semana } from '@papx/models';

@Component({
  selector: 'papx-kpi-calendario-picker',
  template: `
    <ion-list-header
      color="tertiary"
      class="ion-activatable calendar-selector"
      (click)="openPicker()"
    >
      <ion-spinner name="circles" *ngIf="!semanas"></ion-spinner>
      <ion-label class="ion-text-center ion-text-wrap title">
        Semana : {{ value.semana }} ({{ value.fecha_inicial | date: 'MMM-d' }} -
        {{ value.fecha_final | date: 'MMM-d' }}) {{ value.ejercicio }}
      </ion-label>

      <ion-ripple-effect></ion-ripple-effect>
    </ion-list-header>
  `,
  styles: [
    `
      .calendar-selector {
        position: relative;
        overflow: hidden;
        cursor: pointer;
      }

      .title {
        font-size: 1.2rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiCalendarioPickerComponent implements OnInit {
  fecha = new Date().toISOString();
  @Input() semanas: Semana[];
  @Input() value: Semana;
  @Output() valueChange = new EventEmitter<Semana>();

  constructor(private picker: PickerController) {}

  ngOnInit() {}

  getSelectedIndex(): number {
    if (this.semanas) {
      return this.semanas.findIndex((i) => i.id === this.value.id);
    } else return -1;
  }

  async openPicker() {
    const selectedIndex = this.getSelectedIndex();
    const modal = await this.picker.create({
      animated: true,
      mode: 'ios',
      columns: [
        {
          name: 'semana',
          // prefix: 'Semana: ',
          refresh: () => console.log('Refreshs'),
          options: this.getSemanasColumnOptions(),
          align: 'center',
          selectedIndex,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: (value) => this.valueChange.emit(value.semana.value),
        },
      ],
    });
    await modal.present();
    // const {
    //   data: { semana },
    // } = await modal.onWillDismiss();
    // console.log('Data: ', semana);
  }

  private getSemanasColumnOptions() {
    const ops = { locale: es };
    return this.semanas.map((item) => {
      const ini = format(parseJSON(item.fecha_inicial), 'MMM-d ', ops);
      const fin = format(parseJSON(item.fecha_final), 'MMM-d', ops);

      const text = `Semana: ${item.semana}  ${ini} a ${fin} ${item.ejercicio}`;
      return {
        text,
        value: item,
      };
    });
  }
}
