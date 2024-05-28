import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroUserComponent } from './cadastro-user.component';

describe('CadastroUserComponent', () => {
  let component: CadastroUserComponent;
  let fixture: ComponentFixture<CadastroUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroUserComponent]
    });
    fixture = TestBed.createComponent(CadastroUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
