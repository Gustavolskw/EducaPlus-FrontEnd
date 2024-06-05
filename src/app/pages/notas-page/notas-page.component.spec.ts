import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasPageComponent } from './notas-page.component';

describe('NotasPageComponent', () => {
  let component: NotasPageComponent;
  let fixture: ComponentFixture<NotasPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotasPageComponent]
    });
    fixture = TestBed.createComponent(NotasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
