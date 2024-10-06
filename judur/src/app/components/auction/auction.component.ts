import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router'; // Import Router
import Swal from 'sweetalert2'; // Import SweetAlert2

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

  constructor(private http: HttpClient, private router: Router) {}
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
      extra_notes: this.extraNotes  
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
          Swal.fire({
            icon: 'success',
            title: 'Donation Successful!',
            text: 'Your item has been donated successfully.',
            confirmButtonText: 'View Donations'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/donation-history']);
            }
          });
        },
        (error) => {
          console.error('Error donating item:', error);
          Swal.fire({
            icon: 'error',
            title: 'Donation Failed',
            text: 'There was an error donating your item.',
          });
        }
      );
  }
}
