import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonryGridComponent } from './masonry-grid.component';

describe('MasonryGridComponent', () => {
  let component: MasonryGridComponent;
  let fixture: ComponentFixture<MasonryGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasonryGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasonryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
