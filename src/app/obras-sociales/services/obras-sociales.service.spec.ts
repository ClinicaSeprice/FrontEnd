import { TestBed } from '@angular/core/testing';

import { ObrasSocialesService } from './obras-sociales.service';

describe('ObrasSocialesService', () => {
  let service: ObrasSocialesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObrasSocialesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
