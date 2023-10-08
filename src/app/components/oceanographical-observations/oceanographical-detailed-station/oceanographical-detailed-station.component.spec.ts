import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OceanographicalDetailedStationComponent } from './oceanographical-detailed-station.component';

describe('OceanographicalDetailedStationComponent', () => {
  let component: OceanographicalDetailedStationComponent;
  let fixture: ComponentFixture<OceanographicalDetailedStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OceanographicalDetailedStationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OceanographicalDetailedStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
