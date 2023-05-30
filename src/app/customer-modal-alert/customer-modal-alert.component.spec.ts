import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerModalAlertComponent } from './customer-modal-alert.component';

describe('CustomerModalAlertComponent', () => {
  let component: CustomerModalAlertComponent;
  let fixture: ComponentFixture<CustomerModalAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerModalAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerModalAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
