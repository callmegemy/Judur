import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , NavbarComponent], // Add necessary Angular modules
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  private apiUrl = 'http://localhost:8000/api/contact'; // The API URL

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private router: Router // Inject Router for navigation
  ) {
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
          // Display SweetAlert success message
          Swal.fire({
            title: 'Success!',
            text: 'Thank you for contacting us! We will get back to you soon.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirect to the home page after clicking OK
              this.router.navigate(['']); // Redirect to home path
            }
          });

          this.contactForm.reset(); // Reset the form after submission
          this.errorMessage = null;
        },
        error: (error) => {
          console.error('Error sending message:', error);
          Swal.fire({
            title: 'Error!',
            text: 'There was an error sending your message. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    } else {
      this.errorMessage = 'Please fill out all fields correctly.';
    }
  }
}