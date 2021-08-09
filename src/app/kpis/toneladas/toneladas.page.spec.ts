import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToneladasPage } from './toneladas.page';

describe('ToneladasPage', () => {
  let component: ToneladasPage;
  let fixture: ComponentFixture<ToneladasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToneladasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToneladasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
