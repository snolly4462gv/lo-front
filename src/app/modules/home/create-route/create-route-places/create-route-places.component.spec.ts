import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoutePlacesComponent } from './create-route-places.component';

describe('CreateRoutePlacesComponent', () => {
  let component: CreateRoutePlacesComponent;
  let fixture: ComponentFixture<CreateRoutePlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRoutePlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoutePlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
