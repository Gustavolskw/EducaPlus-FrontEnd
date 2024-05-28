import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEnviaFeedbackComponent } from './form-envia-feedback.component';

describe('FormEnviaFeedbackComponent', () => {
  let component: FormEnviaFeedbackComponent;
  let fixture: ComponentFixture<FormEnviaFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEnviaFeedbackComponent]
    });
    fixture = TestBed.createComponent(FormEnviaFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
