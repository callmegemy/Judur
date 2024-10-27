import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { NavbarComponent } from './components/navbar/navbar.component';
import { DonationHistoryComponent } from './components/donation-history/donation-history.component';
import { AuctionComponent } from './components/auction/auction.component';
import { ExaminerReportsComponent } from './components/dashboard/examiner-reports/examiner-reports.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MainComponent } from './components/dashboard/main/main.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { ViewPostComponent } from './components/dashboard/view-post/view-post.component';
import { CreatePostComponent } from './components/dashboard/create-post/create-post.component';
import { PostsDashboardComponent } from './components/dashboard/posts-dashboard/posts-dashboard.component';
import { EditPostComponent } from './components/dashboard/edit-post/edit-post.component';

import { BlogComponent } from './components/blog/blog.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { ReportDetailsComponent } from './components/dashboard/examiner-reports/report-details/report-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
 
  imports: [  AuctionComponent
 ,RouterModule, RouterOutlet,NavbarComponent,DonationHistoryComponent , CommonModule ,ViewProfileComponent,
    EditProfileComponent, EventListComponent, EventDetailsComponent, ExaminerReportsComponent, ReportDetailsComponent,ReactiveFormsModule,ViewPostComponent,
    CreatePostComponent,PostsDashboardComponent,EditPostComponent,    BlogComponent,
    BlogDetailsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'judur';
}
