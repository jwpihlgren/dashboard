import { TestBed } from '@angular/core/testing';

import { HydrologicalObservationsService } from './hydrological-observations.service';

describe('HydrologicalObservationsService', () => {
  let service: HydrologicalObservationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HydrologicalObservationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
