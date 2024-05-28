import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNotasDialogComponent } from './update-notas-dialog.component';

describe('UpdateNotasDialogComponent', () => {
  let component: UpdateNotasDialogComponent;
  let fixture: ComponentFixture<UpdateNotasDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateNotasDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateNotasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
