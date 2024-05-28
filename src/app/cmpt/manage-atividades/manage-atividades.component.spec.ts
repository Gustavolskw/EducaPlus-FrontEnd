import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAtividadesComponent } from './manage-atividades.component';

describe('ManageAtividadesComponent', () => {
  let component: ManageAtividadesComponent;
  let fixture: ComponentFixture<ManageAtividadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAtividadesComponent]
    });
    fixture = TestBed.createComponent(ManageAtividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
