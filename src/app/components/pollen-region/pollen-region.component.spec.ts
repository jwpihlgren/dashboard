import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollenRegionComponent } from './pollen-region.component';

describe('PollenRegionComponent', () => {
  let component: PollenRegionComponent;
  let fixture: ComponentFixture<PollenRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollenRegionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollenRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
