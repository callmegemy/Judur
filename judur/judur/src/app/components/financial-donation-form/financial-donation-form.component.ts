import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-financial-donation-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './financial-donation-form.component.html',
  styleUrls: ['./financial-donation-form.component.css']
})
export class FinancialDonationFormComponent implements OnInit {
  registerForm!: FormGroup;
  private stripe: any; // Define the stripe variable
  private card: any; // Variable to hold the card element

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private donationService: DonationService // Inject the donation service
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.initializeStripe(); // Initialize Stripe on component init
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      donationAmount: ['', [Validators.required, Validators.min(1)]],
      currency: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
     
    });

    
  }

  initializeStripe(): void {
    // Initialize Stripe.js
    this.stripe = (window as any).Stripe('pk_test_51Q6QrU01RsRkSAFAooLLs9DvhKhJ8icYFrcZs7OraWLdFOGDdc8CxIvnFOHf6HjoZ0uhj9NkfzGqzToSIy2lHPOO003wmfAEks'); // Replace with your Stripe public key

    const elements = this.stripe.elements(); // Create an instance of Elements
    this.card = elements.create('card'); // Create a card element
    this.card.mount('#card-element'); // Mount the card element to the specified DOM element
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { donationAmount, currency, paymentMethod } = this.registerForm.value; // Get paymentMethod from form
      this.createPayment(donationAmount, currency, paymentMethod); // Pass paymentMethod to createPayment
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields correctly.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  createPayment(amount: number, currency: string, paymentMethod: string): void {
    // Create a payment intent on the server
    this.donationService.createPayment(amount * 100, currency).subscribe(
      (response: any) => {
        const clientSecret = response.clientSecret;
        console.log('Payment Intent created successfully!', clientSecret);

        // Here you can use Stripe.js to handle the card payment
        this.stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: this.card,
            billing_details: {
              name: 'Cardholder Name', // You can take this from the form or add a new field
            },
          },
        }).then((result: any) => {
          if (result.error) {
            // Show error to your customer
            console.error('Payment failed:', result.error.message);
            Swal.fire({
              title: 'Error!',
              text: result.error.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          } else {
            // Payment succeeded
            if (result.paymentIntent.status === 'succeeded') {
              this.donateMoney(amount, currency, paymentMethod); // Pass paymentMethod to donateMoney
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
          confirmButtonText: 'OK'
        });
      }
    );
  }

  donateMoney(amount: number, currency: string, paymentMethod: string): void {
    const donationData = {
      amount: amount,
      currency: currency,
      payment_method: paymentMethod, // Ensure this is included
    };

    this.authService.donateMoney(donationData).subscribe(
      (response: any) => {
        console.log('Money donated successfully!', response);
        Swal.fire({
          title: 'Success!',
          text: 'Money donated successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/some-success-route']); // Navigate to a success page if needed
      },
      (error: any) => {
        console.error('Error donating money:', error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while donating money. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
