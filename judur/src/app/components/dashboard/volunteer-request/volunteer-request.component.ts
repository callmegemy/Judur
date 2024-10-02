import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { UserService } from '../../../services/dashboard/users.service';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../services/dashboard/request.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-volunteer-request',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent,CommonModule],
  templateUrl: './volunteer-request.component.html',
  styleUrl: './volunteer-request.component.css'
})
export class VolunteerRequestComponent implements OnInit{
  volunteer: any;
  
  constructor(
    private volunteerService: RequestService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}
  
  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.volunteerService.getVolunteerDetails(+id).subscribe((data) => {
        this.volunteer = data;
      });
    }
  }

  confirmAccept() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to accept this volunteer request.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, accept it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateVolunteerStatus(2);
      }
    });
  }

  confirmReject() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to reject this volunteer request.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateVolunteerStatus(3);
      }
    });
  }

  updateVolunteerStatus(status: number) {
    const id = this.route.snapshot.paramMap.get('id');
console.log(id)
    if (id) {
      this.volunteerService.updateVolunteerStatus( +id, status)
        .subscribe({
          next: (response: any) => {
            Swal.fire(
              'Updated!',
              'The volunteer status has been updated.',
              'success'
            );
          },
          error: () => {
            Swal.fire(
              'Error!',
              'Something went wrong.',
              'error'
            );
          }
        });
    }
  }
}
