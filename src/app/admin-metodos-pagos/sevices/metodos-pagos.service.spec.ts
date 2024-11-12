import { TestBed } from '@angular/core/testing';

import { MetodosPagosService } from './metodos-pagos.service';

describe('MetodosPagosService', () => {
  let service: MetodosPagosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodosPagosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
