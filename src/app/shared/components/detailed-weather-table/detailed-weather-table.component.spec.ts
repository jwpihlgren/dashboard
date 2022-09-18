import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedWeatherTableComponent } from './detailed-weather-table.component';

describe('DetailedWeatherTableComponent', () => {
  let component: DetailedWeatherTableComponent;
  let fixture: ComponentFixture<DetailedWeatherTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedWeatherTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedWeatherTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
