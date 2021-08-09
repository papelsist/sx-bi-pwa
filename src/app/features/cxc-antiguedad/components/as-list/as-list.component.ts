import { Component, Input, OnInit } from '@angular/core';
import { AntiguedadPorCliente } from '@papx/models';

@Component({
  selector: 'papx-as-list',
  template: `
    <ion-list>
      <papx-as-item *ngFor="let item of rows" [item]="item"></papx-as-item>
    </ion-list>
  `,
  styleUrls: ['./as-list.component.scss'],
})
export class AsListComponent implements OnInit {
  @Input() rows: AntiguedadPorCliente[] = [];
  constructor() {}

  ngOnInit() {}
}
