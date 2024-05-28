import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMateriasComponent } from './nav-materias.component';

describe('NavMateriasComponent', () => {
  let component: NavMateriasComponent;
  let fixture: ComponentFixture<NavMateriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavMateriasComponent]
    });
    fixture = TestBed.createComponent(NavMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
