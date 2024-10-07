import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidationDetailsComponent } from './liquidation-details.component';

describe('LiquidationDetailsComponent', () => {
  let component: LiquidationDetailsComponent;
  let fixture: ComponentFixture<LiquidationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiquidationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiquidationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
