import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HydrologicalDetailedStationComponent } from './hydrological-detailed-station.component';

describe('HydrologicalDetailedStationComponent', () => {
  let component: HydrologicalDetailedStationComponent;
  let fixture: ComponentFixture<HydrologicalDetailedStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HydrologicalDetailedStationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HydrologicalDetailedStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
