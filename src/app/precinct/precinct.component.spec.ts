import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecinctComponent } from './precinct.component';

describe('PrecinctComponent', () => {
  let component: PrecinctComponent;
  let fixture: ComponentFixture<PrecinctComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecinctComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecinctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
