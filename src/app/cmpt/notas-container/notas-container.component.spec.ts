import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasContainerComponent } from './notas-container.component';

describe('NotasContainerComponent', () => {
  let component: NotasContainerComponent;
  let fixture: ComponentFixture<NotasContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotasContainerComponent]
    });
    fixture = TestBed.createComponent(NotasContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
