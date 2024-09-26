import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAuctionsComponent } from './details-auctions.component';

describe('DetailsAuctionsComponent', () => {
  let component: DetailsAuctionsComponent;
  let fixture: ComponentFixture<DetailsAuctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsAuctionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
