import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TablerosPage } from './tableros.page';

describe('TablerosPage', () => {
  let component: TablerosPage;
  let fixture: ComponentFixture<TablerosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablerosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TablerosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
