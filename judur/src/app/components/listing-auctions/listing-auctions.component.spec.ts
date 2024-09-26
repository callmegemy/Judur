import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingAuctionsComponent } from './listing-auctions.component';

describe('ListingAuctionsComponent', () => {
  let component: ListingAuctionsComponent;
  let fixture: ComponentFixture<ListingAuctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingAuctionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
