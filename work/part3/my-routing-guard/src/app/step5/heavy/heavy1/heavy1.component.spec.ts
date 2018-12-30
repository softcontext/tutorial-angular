import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Heavy1Component } from './heavy1.component';

describe('Heavy1Component', () => {
  let component: Heavy1Component;
  let fixture: ComponentFixture<Heavy1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Heavy1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Heavy1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
