import { Component, OnInit } from '@angular/core';
import { SlideOptions } from '../shared/slide-options';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  title = 'Luxor-Fire based APP';
  slideOpts = SlideOptions.cube;
  _showIntro = true;

  constructor() {}

  ngOnInit() {
    const show = localStorage.getItem('papx.sx-bi.showIntro') || 'true';
    this._showIntro = show === 'true';
    // console.log('Show intro: ', show);
  }

  get showIntro() {
    return this._showIntro;
  }
  set showIntro(value: boolean) {
    console.log('Setting show: ', value);
    localStorage.setItem('papx.sx-bi.showIntro', value.toString());
  }
}
