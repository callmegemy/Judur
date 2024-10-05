import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-financial-donation-form',
  standalone: true,
  templateUrl: './financial-donation-form.component.html',
  styleUrls: ['./financial-donation-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent],
})
export class FinancialDonationFormComponent implements OnInit, AfterViewInit {
  registerForm!: FormGroup;
  stripe: Stripe | null = null;
  cardElement: any;
  cardErrors: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.registerForm = this.fb.group({
      donationAmount: ['', [Validators.required, Validators.min(1)]],
      currency: ['usd', Validators.required],
      paymentMethod: ['creditCard', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    // Initialize Stripe when credit card is selected as the payment method
    this.initializeStripe();
  }

  async initializeStripe() {
    if (!this.stripe) {
      this.stripe = await loadStripe('pk_test_51Q6LjhBAlYQKigvySxyy7lWHBf95fiiO3C2xB6MoUXhuUJ7Ff2iOdDSEs67w9wMlQjfxOrl2vjEkqBnlVRq5yx1400jWpx0dvq'); // Use your publishable key here
    }

    const elements = this.stripe?.elements();
    if (elements) {
      const style = {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a',
        },
      };

      this.cardElement = elements.create('card', { style: style });
      this.cardElement.mount('#card-element');

      this.cardElement.on('change', (event: any) => {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
          displayError!.textContent = event.error.message;
        } else {
          displayError!.textContent = '';
        }
      });
    }
  }

  async handleStripePayment() {
    if (!this.stripe || !this.cardElement) return;

    try {
      // Fetch the client secret from your backend (create-payment-intent)
      const result = await fetch('http://localhost:8000/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, // Include auth token
        },
        body: JSON.stringify({
          amount: this.registerForm.value.donationAmount * 100, // Stripe expects amount in cents
          currency: this.registerForm.value.currency,
        }),
      });

      if (!result.ok) {
        throw new Error(`Server returned ${result.status}: ${result.statusText}`);
      }

      const { clientSecret } = await result.json();

      // Confirm the card payment with the retrieved client secret
      const { paymentIntent, error } = await this.stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: this.cardElement,
        },
      });

      if (error) {
        console.error(error.message);
        alert('Payment failed. Please try again.');
      } else if (paymentIntent?.status === 'succeeded') {
        console.log('Payment successful!');
        alert('Payment successful! Thank you for your donation.');
        // Save payment details after successful Stripe payment
        await this.saveFinancialDonation();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error confirming payment:', error.message);
        alert(`Error confirming payment: ${error.message}`);
      } else {
        console.error('Unknown error occurred:', error);
        alert('An unknown error occurred. Please try again.');
      }
    }
  }

  // Save the financial donation details to the backend
  async saveFinancialDonation() {
    const donationData = {
      amount: this.registerForm.value.donationAmount,
      currency: this.registerForm.value.currency,
      payment_method: 'creditCard', // Since this is a credit card payment
    };

    this.authService.donateMoney(donationData).subscribe({
      next: (response) => {
        console.log('Donation saved successfully:', response);
        alert('Donation saved successfully!');
        // Optionally, redirect to a success or history page
        this.router.navigate(['/donation-history']);
      },
      error: (error) => {
        console.error('Error saving donation:', error);
        alert('Error saving donation. Please try again.');
      },
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.handleStripePayment(); // Handle Stripe payment
    }
  }
}
