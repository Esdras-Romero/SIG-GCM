import { TestBed } from '@angular/core/testing';

import { Guarda } from './guarda';

describe('Guarda', () => {
  let service: Guarda;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Guarda);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
