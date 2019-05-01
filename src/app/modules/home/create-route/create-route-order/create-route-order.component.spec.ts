import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRouteOrderComponent } from './create-route-order.component';

describe('CreateRouteOrderComponent', () => {
  let component: CreateRouteOrderComponent;
  let fixture: ComponentFixture<CreateRouteOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRouteOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRouteOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
