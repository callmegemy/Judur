import { Component, AfterViewInit, OnInit } from '@angular/core';
import $ from 'jquery';
import 'datatables.net';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from "../topbar/topbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, TopbarComponent, SidebarComponent, RouterLink, RouterLinkActive],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, AfterViewInit {
  organizers: any[] = [];
  mentors: any[] = [];
  userForm!: FormGroup;
  isAddUserModalOpen = false;
  isEditUserModalOpen = false;
  selectedUser: any;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.initializeDataTables();
  }

  initForm() {
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
      role_id: [''],
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.organizers = data.filter(user => user.role === 'Organizer');
      this.mentors = data.filter(user => user.role === 'Mentor');

      this.initializeDataTables();
    });
  }

  initializeDataTables() {
    if ($.fn.dataTable.isDataTable('#organizersTable')) {
      $('#organizersTable').DataTable().destroy();
    }
    if ($.fn.dataTable.isDataTable('#mentorsTable')) {
      $('#mentorsTable').DataTable().destroy();
    }

    $('#organizersTable').DataTable({
      data: this.organizers,
      columns: [
        { title: 'Name', data: 'name' },
        { title: 'Role', data: 'role' },
      ],
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    });

    $('#mentorsTable').DataTable({
      data: this.mentors,
      columns: [
        { title: 'Name', data: 'name' },
        { title: 'Role', data: 'role' },
      ],
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    });
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        response => {
          console.log(response.message);
          this.loadUsers();
        },
        error => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          response => {
            console.log('user deleted successfully', response);
            Swal.fire('Deleted!', 'The user has been deleted.', 'success').then(() => {
              this.loadUsers(); 
            });
          },
          error => {
            console.error('Error occurred while deleting user', error);
            Swal.fire('Error!', 'Failed to delete the user.', 'error');
          }
        );
      }
    });
  }
}
