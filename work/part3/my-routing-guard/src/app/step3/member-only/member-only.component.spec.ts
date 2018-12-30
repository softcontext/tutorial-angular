import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberOnlyComponent } from './member-only.component';

describe('MemberOnlyComponent', () => {
  let component: MemberOnlyComponent;
  let fixture: ComponentFixture<MemberOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
