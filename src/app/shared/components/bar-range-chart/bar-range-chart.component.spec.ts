import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarRangeChartComponent } from './bar-range-chart.component';

describe('BarRangeChartComponent', () => {
  let component: BarRangeChartComponent;
  let fixture: ComponentFixture<BarRangeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarRangeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarRangeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
