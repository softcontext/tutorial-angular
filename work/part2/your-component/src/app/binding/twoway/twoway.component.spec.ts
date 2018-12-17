import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwowayComponent } from './twoway.component';

describe('TwowayComponent', () => {
  let component: TwowayComponent;
  let fixture: ComponentFixture<TwowayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwowayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwowayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
