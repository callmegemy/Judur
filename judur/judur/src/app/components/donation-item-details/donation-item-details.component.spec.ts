import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationItemDetailsComponent } from './donation-item-details.component';

describe('DonationItemDetailsComponent', () => {
  let component: DonationItemDetailsComponent;
  let fixture: ComponentFixture<DonationItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationItemDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
