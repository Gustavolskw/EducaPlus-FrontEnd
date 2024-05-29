import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostagensComponent } from './postagens.component';

describe('PostagensComponent', () => {
  let component: PostagensComponent;
  let fixture: ComponentFixture<PostagensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostagensComponent]
    });
    fixture = TestBed.createComponent(PostagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
