import { Component, AfterViewInit, OnInit } from '@angular/core';
import $ from 'jquery';
import 'datatables.net';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from "../topbar/topbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, TopbarComponent, SidebarComponent, RouterLink, RouterLinkActive],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit, AfterViewInit {
  organizers: any[] = []; 
  mentors: any[] = [];     
  userForm!: FormGroup;
  isAddUserModalOpen = false;
  isEditUserModalOpen = false;
  selectedUser: any;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.initializeDataTables();
  
    $(document).on('click', '.delete-button', (event) => {
      const userId = $(event.currentTarget).data('id');
      this.deleteUser(userId);
    });
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
        {
          title: 'Actions',
          data: null,
          render: (data) => `
            <a href="/view-sub-admin/${data.id}" class="btn-circle bg-judur rounded-circle" title="View User"><i class="fa-solid fa-eye"></i></a>
            <a href="/edit-sub-admin/${data.id}" class="btn-circle bg-dark rounded-circle mx-3" title="Edit User"><i class="fa-solid fa-pen text-white"></i></a>
            <a class="btn-circle bg-danger rounded-circle delete-button" data-id="${data.id}" title="Delete User"><i class="fa-solid fa-trash text-white"></i></a>
          `,
        },
        
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
        {
          title: 'Actions',
          data: null,
          render: (data) => `
             <a href="/view-sub-admin/${data.id}" class="btn-circle bg-judur rounded-circle" title="View User"><i class="fa-solid fa-eye"></i></a>
            <a href="/edit-sub-admin/${data.id}" class="btn-circle bg-dark rounded-circle mx-3" title="Edit User"><i class="fa-solid fa-pen text-white"></i></a>
            <a class="btn-circle bg-danger rounded-circle delete-button" data-id="${data.id}" title="Delete User"><i class="fa-solid fa-trash text-white"></i></a>
          `,
        },
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
  
}
