import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollenForecastComponent } from './pollen-forecast.component';

describe('PollenForecastComponent', () => {
  let component: PollenForecastComponent;
  let fixture: ComponentFixture<PollenForecastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PollenForecastComponent]
    });
    fixture = TestBed.createComponent(PollenForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
