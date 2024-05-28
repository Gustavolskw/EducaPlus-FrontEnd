import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContExtraComponent } from './manage-cont-extra.component';

describe('ManageContExtraComponent', () => {
  let component: ManageContExtraComponent;
  let fixture: ComponentFixture<ManageContExtraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageContExtraComponent]
    });
    fixture = TestBed.createComponent(ManageContExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
