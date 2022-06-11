import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilmoistureComponent } from './soilmoisture.component';

describe('SoilmoistureComponent', () => {
  let component: SoilmoistureComponent;
  let fixture: ComponentFixture<SoilmoistureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoilmoistureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoilmoistureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
