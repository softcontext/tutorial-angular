import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloComponent } from './solo.component';

describe('SoloComponent', () => {
  let component: SoloComponent;
  let fixture: ComponentFixture<SoloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
