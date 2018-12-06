import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtcComponent } from './etc.component';

describe('EtcComponent', () => {
  let component: EtcComponent;
  let fixture: ComponentFixture<EtcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
