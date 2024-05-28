import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContExtraComponent } from './cont-extra.component';

describe('ContExtraComponent', () => {
  let component: ContExtraComponent;
  let fixture: ComponentFixture<ContExtraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContExtraComponent]
    });
    fixture = TestBed.createComponent(ContExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
