import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialDonationFormComponent } from './financial-donation-form.component';

describe('FinancialDonationFormComponent', () => {
  let component: FinancialDonationFormComponent;
  let fixture: ComponentFixture<FinancialDonationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialDonationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialDonationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
