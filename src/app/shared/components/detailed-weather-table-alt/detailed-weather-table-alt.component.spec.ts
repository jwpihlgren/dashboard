import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedWeatherTableAltComponent } from './detailed-weather-table-alt.component';

describe('DetailedWeatherTableAltComponent', () => {
  let component: DetailedWeatherTableAltComponent;
  let fixture: ComponentFixture<DetailedWeatherTableAltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedWeatherTableAltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedWeatherTableAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
