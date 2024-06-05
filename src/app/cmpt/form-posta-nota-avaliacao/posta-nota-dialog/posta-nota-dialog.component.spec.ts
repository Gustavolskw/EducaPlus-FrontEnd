import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostaNotaDialogComponent } from './posta-nota-dialog.component';

describe('PostaNotaDialogComponent', () => {
  let component: PostaNotaDialogComponent;
  let fixture: ComponentFixture<PostaNotaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostaNotaDialogComponent]
    });
    fixture = TestBed.createComponent(PostaNotaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
