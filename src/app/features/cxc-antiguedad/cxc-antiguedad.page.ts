import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SortKeys } from '@papx/models';
import { AntiguedadFacade } from './antiguedad.facade';
import { AsOptionsComponent } from './components';

@Component({
  selector: 'app-cxc-antiguedad',
  templateUrl: './cxc-antiguedad.page.html',
  styleUrls: ['./cxc-antiguedad.page.scss'],
})
export class CxcAntiguedadPage implements OnInit {
  antiguedad$ = this.facade.filteredList$;
  summary$ = this.facade.sumary$;

  constructor(
    private facade: AntiguedadFacade,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {}
  onSearch(event: string) {
    this.facade.setFilter(event);
  }

  changeSort(event: SortKeys) {
    console.log('Sorting by: ', event);
    this.facade.setSort(event);
  }

  async showOptions(event: any) {
    const popover = await this.popoverController.create({
      component: AsOptionsComponent,
      event,
      translucent: true,
    });
    await popover.present();
    const { data } = await popover.onWillDismiss<'email' | 'print'>();
    if (data) {
      console.log('Ejecutar: ', data);
    }
  }

  changeOrder(event: 'asc' | 'desc') {
    this.facade.setOrder(event);
  }
}
