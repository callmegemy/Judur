import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-financial-donation-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './financial-donation-form.component.html',
  styleUrls: ['./financial-donation-form.component.css']
})
export class FinancialDonationFormComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      donationAmount: ['', [Validators.required, Validators.min(1)]],
      currency: ['', [Validators.required]],
      paymentMethod: ['', [Validators.required]],
      cardNumber: [''],
      expiryDate: [''],
      cvv: ['']
    });

    this.registerForm.get('paymentMethod')?.valueChanges.subscribe(value => {
      if (value === 'creditCard') {
        this.registerForm.get('cardNumber')?.setValidators([Validators.required, Validators.pattern('^[0-9]{16}$')]);
        this.registerForm.get('expiryDate')?.setValidators([Validators.required, Validators.pattern('(0[1-9]|1[0-2])\\/([0-9]{2})')]);
        this.registerForm.get('cvv')?.setValidators([Validators.required, Validators.pattern('^[0-9]{3}$')]);
      } else {
        this.registerForm.get('cardNumber')?.clearValidators();
        this.registerForm.get('expiryDate')?.clearValidators();
        this.registerForm.get('cvv')?.clearValidators();
      }
      this.registerForm.get('cardNumber')?.updateValueAndValidity();
      this.registerForm.get('expiryDate')?.updateValueAndValidity();
      this.registerForm.get('cvv')?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { donationAmount, currency, paymentMethod, cardNumber, expiryDate, cvv } = this.registerForm.value;
      
      // Prepare data for submission
      const donationData = {
        amount: donationAmount,
        currency: currency,
        payment_method: paymentMethod
      };

      // Make API call to donate money
      this.authService.donateMoney(donationData).subscribe(
        (response: any) => {
          console.log('Money donated successfully!', response);
          window.alert('Money donated successfully!');
          this.router.navigate(['/some-success-route']); // Navigate to a success page if needed
        },
        (error: any) => {
          console.error('Error donating money:', error);
          window.alert('An error occurred while donating money. Please try again.');
        }
      );
    } else {
      console.error('Form is invalid.', this.registerForm.errors);
    }
  }
}
