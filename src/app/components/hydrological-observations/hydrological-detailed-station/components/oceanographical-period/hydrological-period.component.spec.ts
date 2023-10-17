import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HydrologicalPeriodComponent } from './hydrological-period.component';

describe('HydrologicalPeriodComponent', () => {
  let component: HydrologicalPeriodComponent;
  let fixture: ComponentFixture<HydrologicalPeriodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HydrologicalPeriodComponent]
    });
    fixture = TestBed.createComponent(HydrologicalPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
