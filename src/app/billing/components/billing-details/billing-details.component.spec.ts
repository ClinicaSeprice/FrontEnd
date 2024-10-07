import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingDetailsComponent } from './billing-details.component';

describe('BillingDetailsComponent', () => {
  let component: BillingDetailsComponent;
  let fixture: ComponentFixture<BillingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
