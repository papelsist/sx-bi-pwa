import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CxcAntiguedadPage } from './cxc-antiguedad.page';

describe('CxcAntiguedadPage', () => {
  let component: CxcAntiguedadPage;
  let fixture: ComponentFixture<CxcAntiguedadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CxcAntiguedadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CxcAntiguedadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
