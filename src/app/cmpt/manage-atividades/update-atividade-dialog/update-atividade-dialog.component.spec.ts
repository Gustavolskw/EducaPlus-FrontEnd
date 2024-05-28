import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAtividadeDialogComponent } from './update-atividade-dialog.component';

describe('UpdateAtividadeDialogComponent', () => {
  let component: UpdateAtividadeDialogComponent;
  let fixture: ComponentFixture<UpdateAtividadeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAtividadeDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateAtividadeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
