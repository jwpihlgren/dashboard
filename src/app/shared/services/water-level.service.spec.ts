import { TestBed } from '@angular/core/testing';

import { WaterLevelService } from './water-level.service';

describe('WaterLevelService', () => {
  let service: WaterLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
