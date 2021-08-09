import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AntiguedadSummary } from '@papx/models';

@Component({
  selector: 'papx-as-resumen',
  template: `
    <ion-grid>
      <ion-row>
        <ion-col size="12" size-md="4">
          <div class="summary-item">
            <span> Total:</span>
            <div class="detail">
              <h2>{{ summary.total | currency: 'USD':'symbol':'1.0-0' }}</h2>
            </div>
          </div>
        </ion-col>

        <ion-col size="12" size-md="4">
          <div class="summary-item">
            <span> Vencido:</span>
            <div class="detail">
              <h2>{{ summary.vencido | currency: 'USD':'symbol':'1.0-0' }}</h2>
              <h2 class="part vencido">
                {{ summary.vencido / summary.total | percent }}
              </h2>
            </div>
          </div>
        </ion-col>

        <ion-col size="12" size-md="4">
          <div class="summary-item">
            <span> Por vencer</span>
            <div class="detail">
              <h2>
                {{ summary.porVencer | currency: 'USD':'symbol':'1.0-0' }}
              </h2>
              <h2 class="part">
                {{ summary.porVencer / summary.total | percent }}
              </h2>
            </div>
          </div>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col size="12" class="ion-no-padding">
          <ion-list-header>
            <ion-label>
              <h2 class="distribucion-header">
                Distribución del saldo vencido
              </h2>
            </ion-label>
          </ion-list-header>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col size="12" size-md="3">
          <div class="summary-item">
            <span> A 30 días</span>
            <div class="detail">
              <h2>
                {{ summary.de1_30 | currency: 'USD':'symbol':'1.0-0' }}
              </h2>
              <h2 class="part">
                {{ summary.de1_30 / summary.vencido | percent }}
              </h2>
            </div>
          </div>
        </ion-col>
        <ion-col size="12" size-md="3">
          <div class="summary-item">
            <span> De 31 A 60 días</span>
            <div class="detail">
              <h2>
                {{ summary.de31_60 | currency: 'USD':'symbol':'1.0-0' }}
              </h2>
              <h2 class="part">
                {{ summary.de31_60 / summary.vencido | percent }}
              </h2>
            </div>
          </div>
        </ion-col>
        <ion-col size="12" size-md="3">
          <div class="summary-item">
            <span> De 61 A 90 días</span>
            <div class="detail">
              <h2>
                {{ summary.de61_90 | currency: 'USD':'symbol':'1.0-0' }}
              </h2>
              <h2 class="part">
                {{ summary.de61_90 / summary.vencido | percent }}
              </h2>
            </div>
          </div>
        </ion-col>
        <ion-col size="12" size-md="3">
          <div class="summary-item">
            <span> Más de 90 días</span>
            <div class="detail">
              <h2>
                {{ summary.mas90 | currency: 'USD':'symbol':'1.0-0' }}
              </h2>
              <h2 class="part">
                {{ summary.mas90 / summary.vencido | percent }}
              </h2>
            </div>
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
  styleUrls: ['./as-resumen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsResumenComponent implements OnInit {
  @Input() summary: AntiguedadSummary;
  constructor() {}

  ngOnInit() {
    console.log('Summary: ', this.summary);
  }
}
