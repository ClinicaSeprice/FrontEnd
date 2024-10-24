import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppointmentModalComponent } from './add-appointment-modal.component';

describe('AddAppointmentModalComponent', () => {
  let component: AddAppointmentModalComponent;
  let fixture: ComponentFixture<AddAppointmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAppointmentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAppointmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
