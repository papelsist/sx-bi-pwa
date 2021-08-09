import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'papsx-kpi-header',
  template: `
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/kpis"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon
              slot="icon-only"
              ios="ellipsis-horizontal"
              md="ellipsis-vertical"
            ></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiHeaderComponent implements OnInit {
  @Input() title: string;

  constructor() {}

  ngOnInit() {}
}
