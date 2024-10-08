import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DonationService } from '../services/donation.service';
import { CommonModule } from '@angular/common';
import { AuctionserviceService } from '../services/auctionservice.service';

@Component({
  selector: 'app-auction-payment-page',
  standalone: true,
  templateUrl: './auction-payment-page.component.html',
  styleUrls: ['./auction-payment-page.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AuctionPaymentPageComponent implements OnInit, AfterViewInit {
  auctionForm!: FormGroup;
  formVisible = false; 
  private stripe: any;
  private card: any;   
  auctionId: number | undefined; // Auction ID
  highestBidAmount: number | undefined; // Highest bid amount
auctionWinners: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private donationService: DonationService,
    private auctionService:AuctionserviceService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    // Replace with the actual auction ID (could be fetched from route parameters or service)
    this.auctionId = 1; // Placeholder value for demonstration

    // Fetch highest bid amount for the auction
    this.auctionService.getHighestBid(this.auctionId).subscribe(bid => {
      this.highestBidAmount = bid.amount; // Set the highest bid amount
      this.auctionForm.patchValue({ auctionAmount: this.highestBidAmount }); // Populate auction amount
    });

    this.auctionForm.get('paymentMethod')?.valueChanges.subscribe((method) => {
      if (method === 'creditCard') {
        setTimeout(() => {
          this.initializeStripe(); // Initialize Stripe for credit card
        });
      } else {
        this.destroyStripe(); // Clean up if not credit card
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.auctionForm.get('paymentMethod')?.value === 'creditCard') {
      this.initializeStripe(); // Ensure Stripe is initialized after view load
    }
  }

  createForm(): void {
    this.auctionForm = this.fb.group({
      auctionAmount: ['', [Validators.required, Validators.min(1)]],
      currency: ['', Validators.required],
      paymentMethod: ['', Validators.required],
    });
  }

  initializeStripe(): void {
    this.stripe = (window as any).Stripe('pk_test_51Q6QrU01RsRkSAFAooLLs9DvhKhJ8icYFrcZs7OraWLdFOGDdc8CxIvnFOHf6HjoZ0uhj9NkfzGqzToSIy2lHPOO003wmfAEks'); // Use your public key
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
  }

  destroyStripe(): void {
    if (this.card) {
      this.card.destroy(); // Destroy Stripe card element when not needed
      this.card = null;
    }
  }

  toggleForm(): void {
    this.formVisible = !this.formVisible; // Toggle form visibility
  }

  onSubmit(): void {
    if (this.auctionForm.valid) {
      const { auctionAmount, currency, paymentMethod } = this.auctionForm.value;
      this.createPayment(auctionAmount, currency, paymentMethod);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields correctly.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }

  createPayment(amount: number, currency: string, paymentMethod: string): void {
    this.donationService.createPayment(amount * 100, currency).subscribe(
      (response: any) => {
        const clientSecret = response.clientSecret;
        console.log('Payment Intent created successfully!', clientSecret);

        this.stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: this.card,
            billing_details: {
              name: 'Auction Winner', // Customize this
            },
          },
        }).then((result: any) => {
          if (result.error) {
            Swal.fire({
              title: 'Error!',
              text: result.error.message,
              icon: 'error',
              confirmButtonText: 'OK',
            });
          } else {
            if (result.paymentIntent.status === 'succeeded') {
              this.confirmAuctionPayment(amount, currency, paymentMethod);
            }
          }
        });
      },
      (error: any) => {
        console.error('Payment creation failed', error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while creating payment. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  confirmAuctionPayment(amount: number, currency: string, paymentMethod: string): void {
    if (this.auctionId === undefined) {
      throw new Error("Auction ID is required for the payment.");
  }
  
  
  const paymentData = {
    auction_id: this.auctionId, // Now this is guaranteed to be a number
    amount: amount,
    currency: currency,
    payment_method: paymentMethod,
};

    // Make a call to complete the auction payment
    this.donationService.confirmAuctionPayment(paymentData).subscribe(
      (response: any) => {
        Swal.fire({
          title: 'Success!',
          text: 'Auction payment completed successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.router.navigate(['/auction']); // Redirect after payment
      },
      (error: any) => {
        console.error('Error completing auction payment:', error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while processing auction payment. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}
