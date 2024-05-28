import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContExtraDialogComponent } from './update-cont-extra-dialog.component';

describe('UpdateContExtraDialogComponent', () => {
  let component: UpdateContExtraDialogComponent;
  let fixture: ComponentFixture<UpdateContExtraDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateContExtraDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateContExtraDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
