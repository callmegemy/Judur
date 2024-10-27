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
  age:string;
  role_id: 6 | 7 | null; // role_id can be 6, 7, or null
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
    role_id: null, 
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.createUser(this.subAdminData).subscribe(
      response => {
        console.log('Sub-admin added successfully:', response);
        this.router.navigate(['/management']);

      },
      error => {
        console.error('Error adding sub-admin:', error);
        
      }
    );
  }
}
