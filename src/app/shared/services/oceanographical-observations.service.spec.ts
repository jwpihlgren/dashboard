import { TestBed } from '@angular/core/testing';

import { OceanographicalObservationsService } from './oceanographical-observations.service';

describe('OceanographicalObservationsService', () => {
  let service: OceanographicalObservationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OceanographicalObservationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
