import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TopbarComponent } from "../topbar/topbar.component"; 

@Component({
  selector: 'app-edit-sub-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent, TopbarComponent , RouterLink],
  templateUrl: './edit-sub-admin.component.html',
  styleUrls: ['./edit-sub-admin.component.css'], 
})
export class EditSubAdminComponent {
  userForm: FormGroup;
  userId: number | undefined; 
  user: any; 
  roles = [
    { id: 5, name: 'Organizer' },
    { id: 6, name: 'Mentor' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    // Initialize the form group
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      role_id: ['', Validators.required],
      age: [''],
      phone: ['', Validators.maxLength(15)] 
    });
  }

  ngOnInit(): void {
    // Retrieve the user ID from the route
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = +id; // Convert string to number
      this.loadUserData(); // Load user data
    } else {
      console.error('User ID is undefined');
      this.router.navigate(['/management']);
    }
  }

  loadUserData() {
    if (this.userId !== undefined) {
      this.userService.getUserById(this.userId).subscribe(
        (data: any) => {
          this.user = data;
          this.userForm.patchValue(this.user); // Patch form with user data
        },
        (error) => {
          console.error('Error fetching user data', error);
          this.router.navigate(['/management']);
        }
      );
    } else {
      console.error('User ID is not defined. Cannot load user data.');
    }
  }

  onSubmit() {
    if (this.userForm.valid && this.userId !== undefined) {
      console.log('Form values before submitting:', this.userForm.value); // Debugging line

      // Convert the phone field to a string before submitting
      this.userForm.patchValue({
        phone: this.userForm.get('phone')?.value?.toString()
      });

      this.userService.updateUser(this.userId, this.userForm.value).subscribe(
        () => {
          alert('User updated successfully!');
          this.router.navigate(['/management']);
        },
        (error) => {
          console.error('Error updating user', error);
          alert('Failed to update user. Please check the console for details.'); // Alert on error
        }
      );
    } else {
      console.error('Form is invalid or userId is not defined. Cannot submit form.');
    }
  }
}
