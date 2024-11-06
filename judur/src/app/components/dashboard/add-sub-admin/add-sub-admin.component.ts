import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TopbarComponent } from "../topbar/topbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

// Define an interface for subAdminData
interface SubAdminData {
  name: string;
  email: string;
  password: string;
  age: string;
  role_id: 5 | 6 | null;  
  phone: string;
}

@Component({
  selector: 'app-add-sub-admin',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './add-sub-admin.component.html',
  styleUrls: ['./add-sub-admin.component.css']
})
export class AddSubAdminComponent {
  subAdminData: SubAdminData = {
    name: '',
    email: '',
    password: '',
    age: '',
    phone: '',
    role_id: null, 
  };

  errorMessages: any = {};

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.createUser(this.subAdminData).subscribe(
      response => {
        console.log('Sub-admin added successfully:', response);
        this.router.navigate(['/management']);
      },
      error => {
        console.error('Error adding sub-admin:', error);
        
        this.handleErrorResponse(error);
      }
    );
  }

  handleErrorResponse(error: any) {
    const status = error?.status;
    const errors = error?.error?.errors;

    if (status === 422 && errors) {
      this.errorMessages = errors; 
    } else {
      this.errorMessages = { general: 'An unexpected error occurred.' };
    }
  }
}
