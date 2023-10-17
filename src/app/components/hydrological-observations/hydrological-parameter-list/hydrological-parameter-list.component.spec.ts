import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HydrologicalParameterListComponent } from './hydrological-parameter-list.component';

describe('HydrologicalParameterListComponent', () => {
  let component: HydrologicalParameterListComponent;
  let fixture: ComponentFixture<HydrologicalParameterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HydrologicalParameterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HydrologicalParameterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
