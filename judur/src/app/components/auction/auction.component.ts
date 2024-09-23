import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngIf, *ngFor, etc.

@Component({
  selector: 'app-auction',
  standalone: true,  // Make sure the component is standalone
  imports: [CommonModule , FormsModule],  // Add CommonModule here
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent {

  itemName: string = '';
  quantity: number = 1;
  description: string = '';
  isValuable: boolean = false;
  estimatedValue: string = '';
  itemCondition: string = '';
  notifyApproval: boolean = false;

  
  onSubmit() {
    const formData = {
      itemName: this.itemName,
      quantity: this.quantity,
      description: this.description,
      isValuable: this.isValuable,
      estimatedValue: this.estimatedValue,
      itemCondition: this.itemCondition,
      notifyApproval: this.notifyApproval
    };

    console.log('Form Data Submitted:', formData);
    
  }
}
