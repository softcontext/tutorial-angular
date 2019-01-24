import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Animation3Component } from './animation3.component';

describe('Animation3Component', () => {
  let component: Animation3Component;
  let fixture: ComponentFixture<Animation3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Animation3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Animation3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
