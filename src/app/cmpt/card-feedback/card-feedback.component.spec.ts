import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFeedbackComponent } from './card-feedback.component';

describe('CardFeedbackComponent', () => {
  let component: CardFeedbackComponent;
  let fixture: ComponentFixture<CardFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardFeedbackComponent]
    });
    fixture = TestBed.createComponent(CardFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
