import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Animation4Component } from './animation4.component';

describe('Animation4Component', () => {
  let component: Animation4Component;
  let fixture: ComponentFixture<Animation4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Animation4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Animation4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
