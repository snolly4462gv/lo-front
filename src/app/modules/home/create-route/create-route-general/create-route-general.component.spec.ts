import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRouteGeneralComponent } from './create-route-general.component';

describe('CreateRouteGeneralComponent', () => {
  let component: CreateRouteGeneralComponent;
  let fixture: ComponentFixture<CreateRouteGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRouteGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRouteGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
