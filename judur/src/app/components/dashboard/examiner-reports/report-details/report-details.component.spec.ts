import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetailsComponent } from './report-details.component';

describe('ReportDetailsComponent', () => {
  let component: ReportDetailsComponent;
  let fixture: ComponentFixture<ReportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
