import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';// Import AuthService

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
  extraNotes: string = '';  // New property for additional notes
  notifyApproval: boolean = false;

  constructor(private http: HttpClient) {}

  // Method triggered on form submission
  onSubmit(form: any) {
    if (!form.valid) {
      alert('Please fill in all required fields');
      return;
    }

    const formData = {
      item_name: this.itemName,
      value: this.estimatedValue,
      is_valuable: this.isValuable,
      condition: this.itemCondition,
      status_id: this.statusId,
      extra_notes: this.extraNotes  // Include the extra notes field if valuable
    };

    const token = localStorage.getItem('auth_token');  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json'
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
}
