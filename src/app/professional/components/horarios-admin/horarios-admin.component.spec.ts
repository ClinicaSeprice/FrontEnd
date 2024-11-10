import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosAdminComponent } from './horarios-admin.component';

describe('HorariosAdminComponent', () => {
  let component: HorariosAdminComponent;
  let fixture: ComponentFixture<HorariosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorariosAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorariosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
