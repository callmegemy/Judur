import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackForEventComponent } from './feedback-for-event.component';

describe('FeedbackForEventComponent', () => {
  let component: FeedbackForEventComponent;
  let fixture: ComponentFixture<FeedbackForEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackForEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackForEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
