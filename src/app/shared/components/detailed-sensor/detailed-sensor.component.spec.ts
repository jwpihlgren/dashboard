import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedSensorComponent } from './detailed-sensor.component';

describe('DetailedSensorComponent', () => {
  let component: DetailedSensorComponent;
  let fixture: ComponentFixture<DetailedSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedSensorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
