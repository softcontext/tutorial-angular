import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Animation2Component } from './animation2.component';

describe('Animation2Component', () => {
  let component: Animation2Component;
  let fixture: ComponentFixture<Animation2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Animation2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Animation2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
