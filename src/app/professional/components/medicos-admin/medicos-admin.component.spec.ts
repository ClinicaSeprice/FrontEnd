import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosAdminComponent } from './medicos-admin.component';

describe('MedicosAdminComponent', () => {
  let component: MedicosAdminComponent;
  let fixture: ComponentFixture<MedicosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicosAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
