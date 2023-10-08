import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OceanographicalPeriodComponent } from './oceanographical-period.component';

describe('OceanographicalPeriodComponent', () => {
  let component: OceanographicalPeriodComponent;
  let fixture: ComponentFixture<OceanographicalPeriodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OceanographicalPeriodComponent]
    });
    fixture = TestBed.createComponent(OceanographicalPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
