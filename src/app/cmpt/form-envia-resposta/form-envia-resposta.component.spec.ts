import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEnviaRespostaComponent } from './form-envia-resposta.component';

describe('FormEnviaRespostaComponent', () => {
  let component: FormEnviaRespostaComponent;
  let fixture: ComponentFixture<FormEnviaRespostaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEnviaRespostaComponent]
    });
    fixture = TestBed.createComponent(FormEnviaRespostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
