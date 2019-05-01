import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRouteSummaryComponent } from './create-route-summary.component';

describe('CreateRouteSummaryComponent', () => {
  let component: CreateRouteSummaryComponent;
  let fixture: ComponentFixture<CreateRouteSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRouteSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRouteSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
