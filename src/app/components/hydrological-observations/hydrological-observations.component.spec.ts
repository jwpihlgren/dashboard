import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HydrologicalObservationsComponent } from './hydrological-observations.component';

describe('HydrologicalObservationsComponent', () => {
  let component: HydrologicalObservationsComponent;
  let fixture: ComponentFixture<HydrologicalObservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HydrologicalObservationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HydrologicalObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
