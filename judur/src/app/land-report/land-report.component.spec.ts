import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandReportComponent } from './land-report.component';

describe('LandReportComponent', () => {
  let component: LandReportComponent;
  let fixture: ComponentFixture<LandReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
