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
import { EventListComponent } from './components/event-list/event-list.component';
import { RegisterComponent } from './components/register/register.component';
import { VolunteerAnalyticsComponent } from './components/volunteer-analytics/volunteer-analytics.component';
import { ParticipationDetailsComponent } from './components/participation-details/participation-details.component';
import { PerformanceReportsComponent } from './components/performance-reports/performance-reports.component';
import { SuitabilityEvaluationsComponent } from './components/suitability-evaluations/suitability-evaluations.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { ExaminerReportsComponent } from './components/dashboard/examiner-reports/examiner-reports.component';
import { RegisterChoiceComponent } from './components/register-choice/register-choice.component';
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
  { path: 'volunteer-registration', component: VolunteerRegistrationComponent },
  { path: 'auction', component: AuctionComponent },
  { path: 'volunteer-to-examiner', component: VolunteerToExaminerComponent },
  { path: 'donation-history', component: DonationHistoryComponent },
  { path: 'register-choice', component: RegisterChoiceComponent },

  { path: 'donation-item-details/:id', component: DonationItemDetailsComponent },
  { path: 'donation-money-details/:id', component: DonationMoneyDetailsComponent },
  { path: 'donation-land-details/:id', component: DonationLandDetailsComponent },
  { path: 'event-details', component: EventDetailsComponent },
  // { path: 'view-profile', component: ViewProfileComponent},
  { path: 'view-profile', component: ViewProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'list-event', component: EventListComponent },
  { path: 'examiner-reports', component: ExaminerReportsComponent },
  // { path: '', redirectTo: '/donation-history', pathMatch: 'full' },
  // { path: '**', redirectTo: '/donation-history' }

  // Dashboard routes >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  { path: 'dashboard', component: MainComponent },
  // dashboard Routs End
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
