import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrasSocialesComponent } from './obras-sociales.component';

describe('ObrasSocialesComponent', () => {
  let component: ObrasSocialesComponent;
  let fixture: ComponentFixture<ObrasSocialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObrasSocialesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObrasSocialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
