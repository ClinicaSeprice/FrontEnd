import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPacienteComponent } from './buscar-paciente.component';

describe('BuscarPacienteComponent', () => {
  let component: BuscarPacienteComponent;
  let fixture: ComponentFixture<BuscarPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
