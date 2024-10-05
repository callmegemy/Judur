import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandInspectionComponent } from './land-inspection.component';

describe('LandInspectionComponent', () => {
  let component: LandInspectionComponent;
  let fixture: ComponentFixture<LandInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandInspectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
