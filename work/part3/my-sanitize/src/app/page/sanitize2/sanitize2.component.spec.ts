import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sanitize2Component } from './sanitize2.component';

describe('Sanitize2Component', () => {
  let component: Sanitize2Component;
  let fixture: ComponentFixture<Sanitize2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sanitize2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sanitize2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
