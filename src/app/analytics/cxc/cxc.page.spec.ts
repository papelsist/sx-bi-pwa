import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CxcPage } from './cxc.page';

describe('CxcPage', () => {
  let component: CxcPage;
  let fixture: ComponentFixture<CxcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CxcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CxcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
