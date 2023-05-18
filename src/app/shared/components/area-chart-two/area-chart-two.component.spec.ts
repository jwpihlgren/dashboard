import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaChartTwoComponent } from './area-chart-two.component';

describe('AreaChartTwoComponent', () => {
  let component: AreaChartTwoComponent;
  let fixture: ComponentFixture<AreaChartTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaChartTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaChartTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
