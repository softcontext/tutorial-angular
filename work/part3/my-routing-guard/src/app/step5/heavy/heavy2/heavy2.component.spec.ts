import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Heavy2Component } from './heavy2.component';

describe('Heavy2Component', () => {
  let component: Heavy2Component;
  let fixture: ComponentFixture<Heavy2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Heavy2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Heavy2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
