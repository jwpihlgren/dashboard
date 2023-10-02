import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OceanographicalObservationsComponent } from './oceanographical-observations.component';

describe('OceanographicalObservationsComponent', () => {
  let component: OceanographicalObservationsComponent;
  let fixture: ComponentFixture<OceanographicalObservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OceanographicalObservationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OceanographicalObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
