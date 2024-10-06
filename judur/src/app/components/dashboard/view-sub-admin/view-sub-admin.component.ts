import { Component, AfterViewInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from "../topbar/topbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-view-sub-admin',
  standalone: true,
  imports: [CommonModule, TopbarComponent, SidebarComponent,RouterLink],
  templateUrl: './view-sub-admin.component.html',
  styleUrl: './view-sub-admin.component.css'
})
export class ViewSubAdminComponent implements AfterViewInit {
  user: any = {}; 
  userId: number | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id']; 
      if (this.userId !== undefined) {
        this.getUserData(this.userId);
      }
    });
  }

  getUserData(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      user => {
        this.user = user;
        console.log('User data:', user);
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
