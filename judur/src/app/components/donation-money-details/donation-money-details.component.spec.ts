import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationMoneyDetailsComponent } from './donation-money-details.component';

describe('DonationMoneyDetailsComponent', () => {
  let component: DonationMoneyDetailsComponent;
  let fixture: ComponentFixture<DonationMoneyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationMoneyDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationMoneyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
