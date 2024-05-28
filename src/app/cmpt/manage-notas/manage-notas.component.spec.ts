import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNotasComponent } from './manage-notas.component';

describe('ManageNotasComponent', () => {
  let component: ManageNotasComponent;
  let fixture: ComponentFixture<ManageNotasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageNotasComponent]
    });
    fixture = TestBed.createComponent(ManageNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
