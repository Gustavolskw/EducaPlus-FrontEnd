import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadesSelectComponent } from './atividades-select.component';

describe('AtividadesSelectComponent', () => {
  let component: AtividadesSelectComponent;
  let fixture: ComponentFixture<AtividadesSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtividadesSelectComponent]
    });
    fixture = TestBed.createComponent(AtividadesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
