import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { SlideOptions } from '@papx/utils';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BiDataService } from 'src/app/@data-access/services/bi-data.service';
import { KpiFacade } from '../kpi.facade';

@Component({
  selector: 'app-toneladas',
  templateUrl: './toneladas.page.html',
  styleUrls: ['./toneladas.page.scss'],
})
export class ToneladasPage implements OnInit {
  current$ = this.facade.current$;
  resumen$ = this.facade.resumen$;
  toneladas$ = this.facade.toneladas$;
  vm$ = combineLatest([this.current$, this.resumen$, this.toneladas$]).pipe(
    map(([semana, resumen, toneladas]) => ({ semana, resumen, toneladas }))
  );

  ventas$ = this.current$.pipe(
    switchMap((s) => this.biData.fetchVentasPorSemana(s.id))
  );

  segment = 'toneladas';

  slideOptions = SlideOptions.cube;
  @ViewChild(IonSlides) slides: IonSlides;
  constructor(private facade: KpiFacade, private biData: BiDataService) {}

  ngOnInit() {
    this.ventas$.subscribe((vtas) => console.log('Vtas: ', vtas));
  }

  getColor(vm: any) {
    const ref = vm.resumen.semanalAlPorcentaje;
    const valor = vm.toneladas.semanal_kpi;
    const total = vm.resumen.semanal;
    if (valor < ref) return 'danger';
    if (valor >= total) return 'success';
    return 'warning';
  }

  getColorKpi(vm: any) {
    const ref = vm.resumen.puntuacionAlPorcentaje;
    const valor = vm.toneladas.kpi;
    const total = vm.resumen.puntuacion;
    if (valor < ref) return 'danger';
    if (valor >= total) return 'success';
    return 'warning';
  }

  getTipo(data: string) {
    return data === 'semanal'
      ? 'Semana'
      : data === 'mensual'
      ? 'Mes'
      : data === 'anual'
      ? 'Año'
      : '';
  }
  segmentChanged(event: any) {
    const {
      detail: { value },
    } = event;
    const speed = 1000;
    switch (value) {
      case 'toneladas':
        this.slides.slideTo(0, speed);
        break;
      // case 'ventas':
      //   this.slides.slideTo(1, speed);
      //   break;

      case 'vales':
        this.slides.slideTo(1, speed);
        break;
      default:
        break;
    }
  }

  onSlideChanged(event: any) {}
}
