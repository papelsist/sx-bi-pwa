import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'papx-as-options',
  template: `
    <ion-list class="ion-no-padding">
      <ion-item button (click)="close('print')">
        <ion-label> Imprimir </ion-label>
        <ion-icon name="print" slot="start"></ion-icon>
      </ion-item>
      <ion-item button (click)="close('email')">
        <ion-label>Enviar</ion-label>
        <ion-icon name="mail" slot="start"></ion-icon>
      </ion-item>
    </ion-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsOptionsComponent {
  constructor(private popoverController: PopoverController) {}

  async close(task: 'email' | 'print') {
    await this.popoverController.dismiss(task);
  }
}
