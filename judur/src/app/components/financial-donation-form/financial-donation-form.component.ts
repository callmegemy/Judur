



 import {  RouterModule } from '@angular/router';
 import { AuthService } from '../../services/auth.service';
 import Swal from 'sweetalert2';
 import { DonationService } from '../../services/donation.service';
import { Component , OnInit , AfterViewInit} from "@angular/core";
import { FormBuilder, FormGroup , Validator, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-financial-donation-form',
  standalone: true,
  templateUrl: './financial-donation-form.component.html',
  styleUrls: ['./financial-donation-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule ,NavbarComponent], // Standalone component imports
})
export class FinancialDonationFormComponent implements OnInit {
  registerForm!: FormGroup;
  private stripe: any; 
  private card: any; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private donationService: DonationService 
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.registerForm.get('paymentMethod')?.valueChanges.subscribe((method) => {
      if (method === 'creditCard') {
        setTimeout(() => {
          this.initializeStripe();
        });
      } else {
        this.destroyStripe(); 
      }
    });
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

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { donationAmount, currency, paymentMethod } = this.registerForm.value;
      this.createPayment(donationAmount, currency, paymentMethod); 
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
    this.donationService.createPayment(amount * 100, currency).subscribe(
      (response: any) => {
        const clientSecret = response.clientSecret;
        console.log('Payment Intent created successfully!', clientSecret);

      
        this.stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: this.card,
            billing_details: {
              name: 'Cardholder Name', 
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
      payment_method: paymentMethod, 
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
