import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationListComponent } from './navigation-list.component';

describe('NavigationListComponent', () => {
  let component: NavigationListComponent;
  let fixture: ComponentFixture<NavigationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationListComponent]
    });
    fixture = TestBed.createComponent(NavigationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
