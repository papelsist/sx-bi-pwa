import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinanzasPage } from './finanzas.page';

describe('FinanzasPage', () => {
  let component: FinanzasPage;
  let fixture: ComponentFixture<FinanzasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanzasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinanzasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
