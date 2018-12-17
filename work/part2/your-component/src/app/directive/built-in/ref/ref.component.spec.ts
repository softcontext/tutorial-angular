import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefComponent } from './ref.component';

describe('RefComponent', () => {
  let component: RefComponent;
  let fixture: ComponentFixture<RefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
