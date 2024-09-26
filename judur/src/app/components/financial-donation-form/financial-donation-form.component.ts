import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-financial-donation-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule,RouterLinkActive,RouterLink],
  templateUrl: './financial-donation-form.component.html',
  styleUrl: './financial-donation-form.component.css'
})
export class FinancialDonationFormComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      donationAmount: ['', [Validators.required, Validators.min(1)]], // Donation amount validation
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
      const { name, email, mobile, donationAmount, paymentMethod, cardNumber, expiryDate, cvv } = this.registerForm.value;
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Mobile:', mobile);
      console.log('Donation Amount:', donationAmount);
      console.log('Payment Method:', paymentMethod);

      if (paymentMethod === 'creditCard') {
        console.log('Card Number:', cardNumber);
        console.log('Expiry Date:', expiryDate);
        console.log('CVV:', cvv);
      }

      // Handle payment and registration logic
      this.router.navigate(['/login']);
    }
  }

}
