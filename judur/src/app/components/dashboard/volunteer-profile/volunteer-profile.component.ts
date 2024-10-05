import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { UserService } from '../../../services/dashboard/users.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-volunteer-profile',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, CommonModule],
  templateUrl: './volunteer-profile.component.html',
  styleUrl: './volunteer-profile.component.css'
})
export class VolunteerProfileComponent implements OnInit{
  volunteer: any;

  constructor(
    private volunteerService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.volunteerService.getVolunteerDetails(+id).subscribe((data) => {
        this.volunteer = data;
      });
    }
  }
}
