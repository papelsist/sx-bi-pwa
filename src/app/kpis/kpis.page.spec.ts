import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KpisPage } from './kpis.page';

describe('KpisPage', () => {
  let component: KpisPage;
  let fixture: ComponentFixture<KpisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KpisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
