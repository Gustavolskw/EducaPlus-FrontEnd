import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContExtraComponent } from './card-cont-extra.component';

describe('CardContExtraComponent', () => {
  let component: CardContExtraComponent;
  let fixture: ComponentFixture<CardContExtraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardContExtraComponent]
    });
    fixture = TestBed.createComponent(CardContExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
