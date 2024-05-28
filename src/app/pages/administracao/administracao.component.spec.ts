import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracaoComponent } from './administracao.component';

describe('AdministracaoComponent', () => {
  let component: AdministracaoComponent;
  let fixture: ComponentFixture<AdministracaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministracaoComponent]
    });
    fixture = TestBed.createComponent(AdministracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
