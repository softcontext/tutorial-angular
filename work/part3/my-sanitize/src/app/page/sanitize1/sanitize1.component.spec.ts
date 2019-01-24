import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sanitize1Component } from './sanitize1.component';

describe('Sanitize1Component', () => {
  let component: Sanitize1Component;
  let fixture: ComponentFixture<Sanitize1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sanitize1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sanitize1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
