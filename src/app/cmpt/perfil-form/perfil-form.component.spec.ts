import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilFormComponent } from './perfil-form.component';

describe('PerfilFormComponent', () => {
  let component: PerfilFormComponent;
  let fixture: ComponentFixture<PerfilFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilFormComponent]
    });
    fixture = TestBed.createComponent(PerfilFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
