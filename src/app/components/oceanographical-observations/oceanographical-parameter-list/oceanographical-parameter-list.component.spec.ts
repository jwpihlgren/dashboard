import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OceanographicalParameterListComponent } from './oceanographical-parameter-list.component';

describe('OceanographicalParameterListComponent', () => {
  let component: OceanographicalParameterListComponent;
  let fixture: ComponentFixture<OceanographicalParameterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OceanographicalParameterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OceanographicalParameterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
