import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContExtraComponent } from './form-cont-extra.component';

describe('FormContExtraComponent', () => {
  let component: FormContExtraComponent;
  let fixture: ComponentFixture<FormContExtraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormContExtraComponent]
    });
    fixture = TestBed.createComponent(FormContExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
