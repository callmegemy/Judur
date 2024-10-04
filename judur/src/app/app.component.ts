import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { RouterModule, RouterOutlet } from '@angular/router'; 
import { DonationHistoryComponent } from './components/donation-history/donation-history.component';
import { compileNgModule } from '@angular/compiler';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 

import { CommonModule } from '@angular/common';
import { AuctionComponent } from './components/auction/auction.component';
import { ExaminerReportsComponent } from './components/dashboard/examiner-reports/examiner-reports.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component'; 
import { EditProfileComponent } from './components/edit-profile/edit-profile.component'; 
import { MainComponent } from './components/dashboard/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { ReportDetailsComponent } from './components/dashboard/report-details/report-details.component';
import { ViewPostComponent } from './components/dashboard/view-post/view-post.component';
import { CreatePostComponent } from './components/dashboard/create-post/create-post.component';
import { PostsDashboardComponent } from './components/dashboard/posts-dashboard/posts-dashboard.component';
import { EditPostComponent } from './components/dashboard/edit-post/edit-post.component';

@Component({
  selector: 'app-root',
  standalone: true,
 
  imports: [  AuctionComponent, // Ensure this is standalone
  ReportDetailsComponent ,RouterModule, RouterOutlet,NavbarComponent,DonationHistoryComponent , CommonModule ,ViewProfileComponent,
    EditProfileComponent, MainComponent, EventListComponent, EventDetailsComponent, ExaminerReportsComponent, ReportDetailsComponent, 
    HttpClientModule,ReactiveFormsModule,ViewPostComponent,
    CreatePostComponent,PostsDashboardComponent,EditPostComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'judur';
}
