import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilMoistureCardComponent } from './soil-moisture-card.component';

describe('SoilMoistureCardComponent', () => {
  let component: SoilMoistureCardComponent;
  let fixture: ComponentFixture<SoilMoistureCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoilMoistureCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoilMoistureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
