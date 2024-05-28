import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerUserAnaliseComponent } from './container-user-analise.component';

describe('ContainerUserAnaliseComponent', () => {
  let component: ContainerUserAnaliseComponent;
  let fixture: ComponentFixture<ContainerUserAnaliseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerUserAnaliseComponent]
    });
    fixture = TestBed.createComponent(ContainerUserAnaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
