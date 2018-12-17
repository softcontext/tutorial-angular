import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuiltInComponent } from './built-in.component';

describe('BuiltInComponent', () => {
  let component: BuiltInComponent;
  let fixture: ComponentFixture<BuiltInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuiltInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuiltInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
