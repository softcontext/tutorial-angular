import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooLibComponent } from './foo-lib.component';

describe('FooLibComponent', () => {
  let component: FooLibComponent;
  let fixture: ComponentFixture<FooLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
