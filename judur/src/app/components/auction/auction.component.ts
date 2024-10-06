import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';  
import { CommonModule } from '@angular/common';  
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auction',
  standalone: true,  
  imports: [CommonModule, FormsModule, NavbarComponent],  
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent {
  // Form model variables
  itemName: string = '';
  quantity: number = 1;
  description: string = '';
  isValuable: boolean = false;
  estimatedValue: string = '';
  itemCondition: string = '';
  statusId: number = 1;
  extraNotes: string = ''; 
  notifyApproval: boolean = false;
  imageFile: File | null = null; // Variable to hold the image file

  constructor(private http: HttpClient) {}

  // Method triggered on form submission
  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert('Please fill in all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('item_name', this.itemName);
    formData.append('value', this.estimatedValue);
    formData.append('is_valuable', this.isValuable ? '1' : '0'); // Convert boolean to string
    formData.append('condition', this.itemCondition);
    formData.append('status_id', this.statusId.toString());
    formData.append('extra_notes', this.extraNotes); // Include the extra notes field if valuable
    if (this.imageFile) {
      formData.append('image', this.imageFile); // Add the image file
    }

    const token = localStorage.getItem('auth_token');  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      // No need to set Content-Type, as it's automatically set when using FormData
    });
  
    this.http.post('http://localhost:8000/api/donate-item', formData, { headers })
      .subscribe(
        (response) => {
          console.log('Item donation successful:', response);
          alert('Item donated successfully!');
        },
        (error) => {
          console.error('Error donating item:', error);
          alert('There was an error donating the item.');
        }
      );
  }

  // Method to handle file input
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0]; // Set the selected file
    }
  }
}
