import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpensesUpdateModalComponent } from './expenses-update-modal.component';

describe('ExpensesUpdateModalComponent', () => {
  let component: ExpensesUpdateModalComponent;
  let fixture: ComponentFixture<ExpensesUpdateModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesUpdateModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
