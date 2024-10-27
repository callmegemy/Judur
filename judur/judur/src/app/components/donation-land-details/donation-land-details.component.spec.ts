import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationLandDetailsComponent } from './donation-land-details.component';

describe('DonationLandDetailsComponent', () => {
  let component: DonationLandDetailsComponent;
  let fixture: ComponentFixture<DonationLandDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationLandDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationLandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
