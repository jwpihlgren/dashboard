import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OceanographicalStationListComponent } from './oceanographical-station-list.component';

describe('OceanographicalStationListComponent', () => {
  let component: OceanographicalStationListComponent;
  let fixture: ComponentFixture<OceanographicalStationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OceanographicalStationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OceanographicalStationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
