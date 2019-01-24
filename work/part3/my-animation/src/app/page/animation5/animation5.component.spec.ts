import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Animation5Component } from './animation5.component';

describe('Animation5Component', () => {
  let component: Animation5Component;
  let fixture: ComponentFixture<Animation5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Animation5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Animation5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
