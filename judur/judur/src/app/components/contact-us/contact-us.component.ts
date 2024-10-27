import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  private apiUrl = 'http://127.0.0.1:8000/api/contact/send'; 

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.http.post(this.apiUrl, this.contactForm.value).subscribe({
        next: () => {
          this.successMessage = 'Thank you for contacting us! We will get back to you soon.';
          this.contactForm.reset();
          this.errorMessage = null;
        },
        error: (error) => {
          console.error('Error sending message:', error);
          this.errorMessage = 'There was an error sending your message. Please try again.';
          this.successMessage = null;
        }
      });
    } else {
      this.errorMessage = 'Please fill out all fields correctly.';
    }
  }
}
