import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPostaNotaAvaliacaoComponent } from './form-posta-nota-avaliacao.component';

describe('FormPostaNotaAvaliacaoComponent', () => {
  let component: FormPostaNotaAvaliacaoComponent;
  let fixture: ComponentFixture<FormPostaNotaAvaliacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPostaNotaAvaliacaoComponent]
    });
    fixture = TestBed.createComponent(FormPostaNotaAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
