import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  
import { NavbarComponent } from '../navbar/navbar.component';
import {  HttpClientModule } from '@angular/common/http'; 


@Component({
  selector: 'app-auction',
  standalone: true,  
  imports: [CommonModule, FormsModule, NavbarComponent , HttpClientModule],  
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
  statusId: number = 1;  // Declare statusId here
  notifyApproval: boolean = false;

  constructor(private http: HttpClient) {}  // Inject HttpClient

  // Method triggered on form submission
  onSubmit() {
    // Prepare form data for submission
    const formData = {
      item_name: this.itemName,
      value: this.estimatedValue,
      is_valuable: this.isValuable,
      condition: this.itemCondition,
      status_id: this.statusId  // Use statusId from the form
    };

    console.log('Form Data Submitted:', formData);

    // Set up the headers including the Bearer token
    const token = localStorage.getItem('auth_token');  // Replace with actual token storage logic
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Ensure this contains the actual token
      'Content-Type': 'application/json'
    });

    // Make a POST request to the Laravel API
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
}
