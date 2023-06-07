import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallSoilSensorCardComponent } from './small-soil-sensor-card.component';

describe('SmallSoilSensorCardComponent', () => {
  let component: SmallSoilSensorCardComponent;
  let fixture: ComponentFixture<SmallSoilSensorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallSoilSensorCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallSoilSensorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
