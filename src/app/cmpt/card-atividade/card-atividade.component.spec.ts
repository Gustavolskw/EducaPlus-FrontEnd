import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAtividadeComponent } from './card-atividade.component';

describe('CardAtividadeComponent', () => {
  let component: CardAtividadeComponent;
  let fixture: ComponentFixture<CardAtividadeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardAtividadeComponent]
    });
    fixture = TestBed.createComponent(CardAtividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
