import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAtividadesComponent } from './form-atividades.component';

describe('FormAtividadesComponent', () => {
  let component: FormAtividadesComponent;
  let fixture: ComponentFixture<FormAtividadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAtividadesComponent]
    });
    fixture = TestBed.createComponent(FormAtividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
