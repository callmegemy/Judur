import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerAnalyticsComponent } from './volunteer-analytics.component';

describe('VolunteerAnalyticsComponent', () => {
  let component: VolunteerAnalyticsComponent;
  let fixture: ComponentFixture<VolunteerAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
