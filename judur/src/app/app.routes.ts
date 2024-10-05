import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  
import { LandownerRegistrationComponent } from './components/landowner-registration/landowner-registration.component';
import { VolunteerRegistrationComponent } from './components/volunteer-registration/volunteer-registration.component';
import { AuctionComponent } from './components/auction/auction.component';
import { VolunteerToExaminerComponent } from './components/volunteer-to-examiner/volunteer-to-examiner.component';
import { DonationHistoryComponent } from './components/donation-history/donation-history.component';
import { DonationItemDetailsComponent } from './components/donation-item-details/donation-item-details.component';
import { DonationLandDetailsComponent } from './components/donation-land-details/donation-land-details.component';
import { DonationMoneyDetailsComponent } from './components/donation-money-details/donation-money-details.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';  
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { MainComponent } from './components/dashboard/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { DonateComponent } from './components/donate/donate.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VolunteerAnalyticsComponent } from './components/volunteer-analytics/volunteer-analytics.component';
import { ParticipationDetailsComponent } from './components/participation-details/participation-details.component';
import { PerformanceReportsComponent } from './components/performance-reports/performance-reports.component';
import { SuitabilityEvaluationsComponent } from './components/suitability-evaluations/suitability-evaluations.component';
import { FinancialDonationFormComponent } from './components/financial-donation-form/financial-donation-form.component';
import { UsersAdminComponent } from './components/dashboard/users-admin/users-admin.component';
import { RequestsComponent } from './components/dashboard/requests/requests.component';
import { VolunteerRequestComponent } from './components/dashboard/volunteer-request/volunteer-request.component';
import { ExaminerRequestComponent } from './components/dashboard/examiner-request/examiner-request.component';
import { VolunteerProfileComponent } from './components/dashboard/volunteer-profile/volunteer-profile.component';
import { DonerProfileComponent } from './components/dashboard/doner-profile/doner-profile.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { ExaminerReportsComponent } from './components/dashboard/examiner-reports/examiner-reports.component';
import { ReportDetailsComponent } from './components/dashboard/examiner-reports/report-details/report-details.component';
import { PostsDashboardComponent } from './components/dashboard/posts-dashboard/posts-dashboard.component';
import { CreatePostComponent } from './components/dashboard/create-post/create-post.component';
import { ViewPostComponent } from './components/dashboard/view-post/view-post.component';
import { EditPostComponent } from './components/dashboard/edit-post/edit-post.component';
import { ListingAuctionsComponent } from './components/listing-auctions/listing-auctions.component';
import { DetailsAuctionsComponent } from './components/details-auctions/details-auctions.component';
import { RegisterChoiceComponent } from './components/register-choice/register-choice.component';
import { EventsComponent } from './components/dashboard/events/events.component';
import { EditEventComponent } from './components/dashboard/edit-event/edit-event.component';
import { CreateEventComponent } from './components/dashboard/create-event/create-event.component';
import { ViewEventComponent } from './components/dashboard/view-event/view-event.component';
import { AuctionsComponent } from './components/dashboard/auctions/auctions.component';
import { ViewAuctionComponent } from './components/dashboard/view-auction/view-auction.component';
import { EditAuctionComponent } from './components/dashboard/edit-auction/edit-auction.component';
import { CreateAuctionComponent } from './components/dashboard/create-auction/create-auction.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  }, {
  path: 'about', 
  component: AboutComponent
  }
  ,
  {
  path: 'donate', 
  component: DonateComponent
  },
   { path: 'login', component: LoginComponent},
   { path: 'register', component: RegisterComponent},
  // // { path: 'forgot-password', component: ForgotPasswordComponent },
   { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'volunteer-analytics', component: VolunteerAnalyticsComponent},
   { path: 'participation-details', component: ParticipationDetailsComponent },
   { path: 'performance-report', component: PerformanceReportsComponent },
   { path: 'suitability-evaluations', component: SuitabilityEvaluationsComponent },
  { path: 'landowner-registration', component: LandownerRegistrationComponent },
  { path: 'money-donation', component: FinancialDonationFormComponent },
  { path: 'volunteer-registration', component: VolunteerRegistrationComponent },
  { path: 'auction', component: AuctionComponent },
  { path: 'volunteer-to-examiner', component: VolunteerToExaminerComponent },
  { path: 'donation-history', component: DonationHistoryComponent },
  { path: 'register-choice', component: RegisterChoiceComponent },

  // Donation details routes by category
  { path: 'donation-item-details', component: DonationItemDetailsComponent },
  { path: 'donation-money-details', component: DonationMoneyDetailsComponent },
  { path: 'donation-land-details', component: DonationLandDetailsComponent },

  // { path: 'view-profile', component: ViewProfileComponent},
  { path: 'view-profile', component: ViewProfileComponent },
  { path: 'profile/edit/:id', component: EditProfileComponent },
      { path: 'list-event/event-details/:id', component: EventDetailsComponent },

  { path: 'list-event', component: EventListComponent},

  // { path: '', redirectTo: '/donation-history', pathMatch: 'full' },
  // { path: '**', redirectTo: '/donation-history' }
  {path:'auction-list',component:ListingAuctionsComponent},
  {
    path:'auction-details',component:DetailsAuctionsComponent
  },

  // Dashboard routes >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  
  // { path: '', redirectTo: '/donation-history', pathMatch: 'full' },
  // { path: '**', redirectTo: '/donation-histor>>>>>
  { path: 'dashboard', component: MainComponent },
  { path: 'dashboard/users', component: UsersAdminComponent },
  { path: 'dashboard/requests', component: RequestsComponent },
  { path: 'dashboard/request/view/v', component: VolunteerRequestComponent },
  { path: 'dashboard/request/view/ex', component: ExaminerRequestComponent },
  { path: 'dashboard/userProfile/volunteer', component: VolunteerProfileComponent },
  { path: 'dashboard/userProfile/doner', component: DonerProfileComponent },

  { path: 'dashboard/events', component: EventsComponent },
  { path: 'dashboard/events/edit', component: EditEventComponent },
  { path: 'dashboard/events/view', component: ViewEventComponent },
  { path: 'dashboard/events/create', component: CreateEventComponent },

  { path: 'dashboard/auctions', component: AuctionsComponent },
  { path: 'dashboard/auctions/view', component: ViewAuctionComponent },
  { path: 'dashboard/auctions/edit', component: EditAuctionComponent },
  { path: 'dashboard/auctions/create', component: CreateAuctionComponent },

  { path: 'dashboard/examiner-reports', component: ExaminerReportsComponent },
  { path: 'dashboard/examiner-reports/report-details/:id', component: ReportDetailsComponent },
  
  { path: 'dashboard/posts', component: PostsDashboardComponent},
  { path: 'dashboard/posts/create-post', component: CreatePostComponent },
  { path: 'dashboard/posts/view-post/:id', component: ViewPostComponent },
  { path: 'dashboard/posts/edit-post/:id', component: EditPostComponent },



  // dashboard Routs End
  
  { path: 'listing-auctions' , component: ListingAuctionsComponent},
  { path: 'details-auctions' , component:DetailsAuctionsComponent},
  {path:'contact-us',component:ContactUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
