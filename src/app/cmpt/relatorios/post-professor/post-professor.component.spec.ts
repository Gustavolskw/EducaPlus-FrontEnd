import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostProfessorComponent } from './post-professor.component';

describe('PostProfessorComponent', () => {
  let component: PostProfessorComponent;
  let fixture: ComponentFixture<PostProfessorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostProfessorComponent]
    });
    fixture = TestBed.createComponent(PostProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
