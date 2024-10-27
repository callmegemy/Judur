import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/dashboard/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donor-profile',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, CommonModule],
  templateUrl: './doner-profile.component.html',
  styleUrls: ['./doner-profile.component.css']
})
export class DonorProfileComponent implements OnInit {
  donor: any = {}; 
  totalDonations: number = 0;

  constructor(
    private route: ActivatedRoute,
    private donorService: UserService
  ) {}

  ngOnInit(): void {
    this.getDonorDetails();
  }

  getDonorDetails(): void {
    // Get the donor ID from the route snapshot and convert it to a number if necessary
    const donorId = Number(this.route.snapshot.paramMap.get('id'));

    if (donorId) {
      this.donorService.getDonorDetails(donorId).subscribe(
        (response) => {
          this.donor = response.donor; 
          this.totalDonations = response.donor.total_donations || 0;
        },
        (error) => {
          console.error('Error fetching donor details', error);
        }
      );
    } else {
      console.error('No donor ID found in the route');
    }
  }
}
