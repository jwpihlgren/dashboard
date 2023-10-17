import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HydrologicalStationListComponent } from './oceanographical-station-list.component';

describe('HydrologicalStationListComponent', () => {
  let component: HydrologicalStationListComponent;
  let fixture: ComponentFixture<HydrologicalStationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HydrologicalStationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HydrologicalStationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
