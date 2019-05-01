import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRouteIndexComponent } from './create-route-index.component';

describe('CreateRouteIndexComponent', () => {
  let component: CreateRouteIndexComponent;
  let fixture: ComponentFixture<CreateRouteIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRouteIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRouteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
