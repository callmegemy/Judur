import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-financial-donation-form',
  standalone: true,
  templateUrl: './financial-donation-form.component.html',
  styleUrls: ['./financial-donation-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule ,], // Standalone component imports
})
export class FinancialDonationFormComponent implements OnInit, AfterViewInit {
  registerForm!: FormGroup;
  stripe: Stripe | null = null;
  cardElement: any;
  cardErrors: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,  // Inject AuthService
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.registerForm = this.fb.group({
      donationAmount: ['', [Validators.required, Validators.min(1)]],
      currency: ['', Validators.required],
      paymentMethod: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    // Listen for changes in the payment method selection
    this.registerForm.get('paymentMethod')?.valueChanges.subscribe((method: string) => {
      if (method === 'creditCard') {
        this.initializeStripe(); // Initialize Stripe only if "Credit Card" is selected
      }
    });
  }

  async initializeStripe() {
    if (!this.stripe) {
      this.stripe = await loadStripe('your-publishable-key');  // Replace with your actual publishable key
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

      // Handle real-time validation errors from the card Element
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
        },
        body: JSON.stringify({
          amount: this.registerForm.value.donationAmount,
          currency: this.registerForm.value.currency,
        }),
      });

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
      console.error('Error confirming payment:', error);
      alert('An error occurred. Please try again.');
    }
  }

  // Save the financial donation details to the backend
  async saveFinancialDonation() {
    const donationData = {
      amount: this.registerForm.value.donationAmount,
      currency: this.registerForm.value.currency,
      payment_method: 'creditCard', // As this is a credit card payment
    };

    // Use AuthService to save the donation
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
      const paymentMethod = this.registerForm.value.paymentMethod;
      if (paymentMethod === 'creditCard') {
        this.handleStripePayment(); // Handle Stripe payment
      } else if (paymentMethod === 'paypal') {
        console.log('Initiating PayPal payment...');
        // Optionally, handle PayPal payment flow here
      }
    }
  }
}
