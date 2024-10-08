import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionPaymentPageComponent } from './auction-payment-page.component';

describe('AuctionPaymentPageComponent', () => {
  let component: AuctionPaymentPageComponent;
  let fixture: ComponentFixture<AuctionPaymentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctionPaymentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionPaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
