import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DonationHistoryComponent } from './components/donation-history/donation-history.component';
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
import { BlogComponent } from './components/blog/blog.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
 
  imports: [  AuctionComponent ,RouterModule, RouterOutlet,NavbarComponent,DonationHistoryComponent , CommonModule ,ViewProfileComponent,
    EditProfileComponent, MainComponent, EventListComponent, EventDetailsComponent, ExaminerReportsComponent, ReportDetailsComponent, HttpClientModule,ReactiveFormsModule, BlogComponent, BlogDetailsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'judur';
}
