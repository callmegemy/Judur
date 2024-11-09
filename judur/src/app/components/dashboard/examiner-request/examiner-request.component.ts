import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { RequestService } from '../../../services/dashboard/request.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examiner-request',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, RouterLink],
  templateUrl: './examiner-request.component.html',
  styleUrl: './examiner-request.component.css'
})
export class ExaminerRequestComponent {
  examiner: any;
  
  constructor(
    private examinerService: RequestService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router 
  ) {}
  
  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.examinerService.getExaminerDetails(+id).subscribe((data) => {
        this.examiner = data;
      });
    }
  }

  confirmAccept() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to accept this Examiner request.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, accept it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateExaminerStatus(2);
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
        this.updateExaminerStatus(3);
      }
    });
  }

  updateExaminerStatus(status: number) {
    const id = this.route.snapshot.paramMap.get('id');
console.log(id)
    if (id) {
      this.examinerService.updateExaminerStatus(+id, status)
      .subscribe({
        next: (response: any) => {
          Swal.fire(
            'Updated!',
            'The Examiner status has been updated.',
            'success'
          ).then(() => {
            this.router.navigate(['dashboard/requests']); 
          });
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
