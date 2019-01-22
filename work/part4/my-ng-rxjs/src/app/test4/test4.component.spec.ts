import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Test4Component } from './test4.component';

describe('Test4Component', () => {
  let component: Test4Component;
  let fixture: ComponentFixture<Test4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Test4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Test4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
