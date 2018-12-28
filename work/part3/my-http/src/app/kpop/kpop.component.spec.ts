import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpopComponent } from './kpop.component';

describe('KpopComponent', () => {
  let component: KpopComponent;
  let fixture: ComponentFixture<KpopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
