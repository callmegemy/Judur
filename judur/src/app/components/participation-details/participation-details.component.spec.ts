import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationDetailsComponent } from './participation-details.component';

describe('ParticipationDetailsComponent', () => {
  let component: ParticipationDetailsComponent;
  let fixture: ComponentFixture<ParticipationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
