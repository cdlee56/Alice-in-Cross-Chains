import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceFormComponent } from './evidence-form.component';

describe('EvidenceFormComponent', () => {
  let component: EvidenceFormComponent;
  let fixture: ComponentFixture<EvidenceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
