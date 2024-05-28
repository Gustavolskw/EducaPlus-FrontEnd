import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroUserFormComponent } from './cadastro-user-form.component';

describe('CadastroUserFormComponent', () => {
  let component: CadastroUserFormComponent;
  let fixture: ComponentFixture<CadastroUserFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroUserFormComponent]
    });
    fixture = TestBed.createComponent(CadastroUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
