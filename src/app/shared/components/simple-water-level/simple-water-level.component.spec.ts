import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleWaterLevelComponent } from './simple-water-level.component';

describe('SimpleWaterLevelComponent', () => {
  let component: SimpleWaterLevelComponent;
  let fixture: ComponentFixture<SimpleWaterLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleWaterLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleWaterLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
