import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitabilityEvaluationsComponent } from './suitability-evaluations.component';

describe('SuitabilityEvaluationsComponent', () => {
  let component: SuitabilityEvaluationsComponent;
  let fixture: ComponentFixture<SuitabilityEvaluationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuitabilityEvaluationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuitabilityEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
