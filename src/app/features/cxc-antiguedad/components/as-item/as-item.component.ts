import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AntiguedadPorCliente } from '@papx/models';

@Component({
  selector: 'papx-as-item',
  template: `
    <ion-item [routerLink]="item.id" detail>
      <ion-label>
        <ion-grid>
          <ion-row>
            <ion-col size="12" class="ion-text-wrap">
              <ion-text color="secondary">
                <h2 class="cliente">{{ item.cliente }}</h2>
              </ion-text>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12" size-md="4">
              <span>Saldo: {{ item.saldo | currency }}</span>
            </ion-col>
            <ion-col size="12" size-md="4">
              <span class="ion-padding-end">Por Vencer:</span>
              <ion-text color="success">
                <span>{{ item.porVencer | currency }}</span>
              </ion-text>
            </ion-col>
            <ion-col size="12" size-md="4">
              <span class="ion-padding-end">Vencido: </span>
              <ion-text color="danger">
                <span>{{ item.vencido | currency }}</span>
              </ion-text>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12" size-md="4">
              <span class="ion-padding-end">A 30:</span>
              <span>{{ item.de1_30 | currency }}</span>
            </ion-col>
            <ion-col size="12" size-md="4" *ngIf="item.de31_60 > 0">
              <span class="ion-padding-end">31-60:</span>
              <span>{{ item.de31_60 | currency }}</span>
            </ion-col>
            <ion-col size="12" size-md="4" *ngIf="item.de61_90 > 0">
              <span class="ion-padding-end">61-90:</span>
              <span>{{ item.de61_90 | currency }}</span>
            </ion-col>
            <ion-col size="12" *ngIf="item.mas90 > 0">
              <span>90+: </span>
              <ion-text class="ion-padding-start" color="danger">
                {{ item.mas90 | currency }}
              </ion-text>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-label>
      <ion-chip slot="end" color="warning" mode="ios">
        <ion-label class="part">
          {{ item.participacion | percent: '1.2-2' }}
        </ion-label>
      </ion-chip>
    </ion-item>
  `,
  styleUrls: ['./as-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsItemComponent implements OnInit {
  @Input() item: AntiguedadPorCliente;
  constructor() {}

  ngOnInit() {}
}
