import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMemberComponent } from './info-member.component';

describe('InfoMemberComponent', () => {
  let component: InfoMemberComponent;
  let fixture: ComponentFixture<InfoMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
