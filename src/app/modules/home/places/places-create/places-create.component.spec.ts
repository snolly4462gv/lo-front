import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesCreateComponent } from './places-create.component';

describe('PlacesCreateComponent', () => {
  let component: PlacesCreateComponent;
  let fixture: ComponentFixture<PlacesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
