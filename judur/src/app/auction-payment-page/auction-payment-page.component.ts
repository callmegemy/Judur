import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { AuctionserviceService } from '../services/auctionservice.service';
import { DonationService } from '../services/donation.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auction-payment-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auction-payment-page.component.html',
  styleUrls: ['./auction-payment-page.component.css'],
})
export class AuctionPaymentPageComponent implements OnInit, AfterViewInit {
  auctionForm!: FormGroup;
  formVisible = false;
  private stripe: any;
  private card: any;
  auctionId: number | undefined;
  highestBidAmount: number | undefined;
  currency = 'USD';
  userId: number | null = null;
  auctionTitle: string | undefined;
  auctionImage: string | undefined;
  auctionStatusId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private donationService: DonationService,
    private auctionService: AuctionserviceService,
    private authService: AuthService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.auctionService.getCompletedAuctions().subscribe(
      (data) => {
        console.log('Fetched auction data:', data);
        if (data.length > 0) {
          this.auctionId = data[0].auction_id;
          this.highestBidAmount = data[0].bid_amount;
          this.auctionTitle = data[0].auction_title;
          this.auctionImage = data[0].auction_image;
          this.auctionStatusId = data[0].auction_status_id;

          if (this.auctionStatusId === 5) {
            Swal.fire({
              title: 'Payment Completed',
              text: 'You have already paid for this auction, thank you!',
              icon: 'info',
              confirmButtonText: 'OK',
            });
            this.formVisible = false;
          } else {
            this.formVisible = false;
            this.auctionForm.get('paymentMethod')?.valueChanges.subscribe((method) => {
              if (method === 'creditCard') {
                setTimeout(() => this.initializeStripe());
              } else {
                this.destroyStripe();
              }
            });
          }
        } else {
          console.log('No auction data available.');
        }
      },
      (error) => {
        console.error('Error fetching auction winners', error);
      }
    );
  }

  

  ngAfterViewInit(): void {
  
    if (this.auctionForm.get('paymentMethod')?.value === 'creditCard') {
      this.initializeStripe();
    }
  }

  createForm(): void {
    this.auctionForm = this.fb.group({
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
      this.card.destroy();
      this.card = null;
    }
  }

  toggleForm(): void {
    this.formVisible = !this.formVisible;
  }

  onSubmit(): void {
    if (this.auctionForm.valid && this.auctionId !== undefined) {
      const { paymentMethod } = this.auctionForm.value;
      const userId: number | null = this.authService.getUserId();

      if (userId === null) {
        Swal.fire({
          title: 'Error!',
          text: 'User ID is not available. Please log in again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return;
      }

      this.createAuctionPayment(this.highestBidAmount!, this.currency, userId.toString(), this.auctionId!);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields correctly or ensure auction ID is available.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }


  createAuctionPayment(amount: number, currency: string, userId: string, auctionId: number): void {
    this.donationService.createAuctionPayment(amount, currency, auctionId).subscribe(
      (response: any) => {
        console.log('Payment creation response:', response);
        const clientSecret = response.clientSecret;
        const { paymentMethod } = this.auctionForm.value;

        if (paymentMethod === 'creditCard') {
          this.stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: this.card,
              billing_details: { name: 'Auction Winner' },
            },
          }).then((result: any) => {
            if (result.error) {
              Swal.fire({ title: 'Error!', text: result.error.message, icon: 'error', confirmButtonText: 'OK' });
            } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
              this.confirmAuctionPayment(amount, currency, paymentMethod, userId);
            }
          });
        } else {
          this.confirmAuctionPayment(amount, currency, paymentMethod, userId);
        }
      },
      (error) => {
        console.error('Payment creation failed:', error);
        Swal.fire({ title: 'Error!', text: 'Payment creation failed. Try again.', icon: 'error', confirmButtonText: 'OK' });
      }
    );
  }

  confirmAuctionPayment(amount: number, currency: string, paymentMethod: string, userId: string): void {
    if (this.auctionId === undefined) {
      Swal.fire({
        title: 'Error!',
        text: 'Auction ID is missing. Cannot proceed with payment.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const paymentData = {
      auction_id: this.auctionId,
      user_id: userId,
      amount: amount,
      currency: currency,
      payment_method: paymentMethod,
    };

    console.log('Confirming auction payment with data:', paymentData);

    this.donationService.confirmAuctionPayment(paymentData).subscribe(
      (response: any) => {
        console.log('Confirm auction payment response:', response);
        Swal.fire({
          title: 'Success!',
          text: 'Auction payment completed successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.router.navigate(['/']);
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

