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
import { BlogComponent } from './components/blog/blog.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { FinancialDonationFormComponent } from './components/financial-donation-form/financial-donation-form.component';
import { UsersAdminComponent } from './components/dashboard/users-admin/users-admin.component';
import { RequestsComponent } from './components/dashboard/requests/requests.component';
import { VolunteerRequestComponent } from './components/dashboard/volunteer-request/volunteer-request.component';
import { ExaminerRequestComponent } from './components/dashboard/examiner-request/examiner-request.component';
import { VolunteerProfileComponent } from './components/dashboard/volunteer-profile/volunteer-profile.component';
import { DonorProfileComponent } from './components/dashboard/doner-profile/doner-profile.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { ExaminerReportsComponent } from './components/dashboard/examiner-reports/examiner-reports.component';
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
import { CreateAuctionComponent } from './components/dashboard/create-auction/create-auction.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { LandInspectionComponent } from './land-inspection/land-inspection.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { authGuard } from '../app/auth.guard';
import { UserManagementComponent } from './components/dashboard/user-management/user-management.component';
import { AddSubAdminComponent } from './components/dashboard/add-sub-admin/add-sub-admin.component';
import { ViewSubAdminComponent } from './components/dashboard/view-sub-admin/view-sub-admin.component';
import { EditSubAdminComponent } from './components/dashboard/edit-sub-admin/edit-sub-admin.component';
import { AvailableLandsComponent } from './components/available-lands/available-lands.component';

import { EditAuctionComponent } from './components/dashboard/edit-auction/edit-auction.component';


import { EventJoinComponent } from './components/event-join/event-join.component';
import { ReportDetailsComponent } from './components/dashboard/examiner-reports/report-details/report-details.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { organizerGuardGuard } from './organizer-guard.guard';
import { adminGuard } from './admin.guard';
import { mentorGuardGuard } from './mentor-guard.guard';
import { volunteerGuard } from './volunteer.guard';
import { donorGuard } from './donor.guard';
import { combineGuard } from './combine.guard';
import { adminmGuard } from './adminm.guard';
import { adminoGuard } from './admino.guard';

import { ViewValuableItemsComponent } from './components/dashboard/view-valuable-items/view-valuable-items.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NotificationComponent } from './components/notification/notification.component';
import { AuctionPaymentPageComponent } from './auction-payment-page/auction-payment-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  }, {
    path: 'about',
    component: AboutComponent
  }
  ,  { path: 'notifications', component: NotificationComponent },
  {
    path: 'donate',
    component: DonateComponent,
    canActivate:[donorGuard]


  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // // { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'volunteer-analytics', component: VolunteerAnalyticsComponent 
    ,canActivate:[volunteerGuard]

  },
  {path:'volunteer-registration',component:VolunteerRegistrationComponent },
  { path: 'participation-details', component: ParticipationDetailsComponent 
    ,canActivate:[volunteerGuard]
  },
  { path: 'performance-report', component: PerformanceReportsComponent 
    ,canActivate:[volunteerGuard]

  },
  { path: 'suitability-evaluations', component: SuitabilityEvaluationsComponent 
    ,canActivate:[volunteerGuard]
  },
  { path: 'landowner-registration', component: LandownerRegistrationComponent
    ,canActivate:[donorGuard]
   },
  { path: 'money-donation', component: FinancialDonationFormComponent 
    ,canActivate:[donorGuard]
  },
  { path: 'volunteer-registration', component: VolunteerRegistrationComponent 
    ,canActivate:[authGuard]
  },
  { path: 'auction', component: AuctionComponent
    ,canActivate:[donorGuard]
   },
  { path: 'volunteer-to-examiner', component: VolunteerToExaminerComponent 
    ,canActivate:[volunteerGuard]
  },
  { path: 'donation-history', component: DonationHistoryComponent 
    ,canActivate:[donorGuard]
  },
  { path: 'register-choice', component: RegisterChoiceComponent
    
   },

  // Donation details routes by category
  { path: 'donation-item-details', component: DonationItemDetailsComponent 
    ,canActivate:[donorGuard]
  },
  { path: 'donation-money-details', component: DonationMoneyDetailsComponent
    ,canActivate:[donorGuard]
   },
  { path: 'donation-land-details', component: DonationLandDetailsComponent
    ,canActivate:[donorGuard]
   },

  // { path: 'view-profile', component: ViewProfileComponent},
  {
    path: 'view-profile', component: ViewProfileComponent
    ,canActivate:[authGuard]
  },
 
  {
    path: 'list-event/event-details', component: EventDetailsComponent
    ,canActivate:[authGuard]
  },

  { path: 'edit-profile/:id', component: EditProfileComponent
    ,canActivate:[authGuard]
   },
  { path: 'list-event/event-details/:id', component: EventDetailsComponent
   },

  { path: 'list-event', component: EventListComponent 
  },
  { path: 'profile/edit/:id', component: EditProfileComponent
    ,canActivate:[authGuard]
   },

      { path: 'list-event/join-event/:id', component: EventJoinComponent 
        ,canActivate:[volunteerGuard]
      },
  { path: 'list-event', component: EventListComponent
  },

  // { path: '', redirectTo: '/donation-history', pathMatch: 'full' },
  // { path: '**', redirectTo: '/donation-history' }
  {path:'auction-details/:id',component:DetailsAuctionsComponent
    
  },
  { 
    path: 'auction-list', component: ListingAuctionsComponent
    
  },
  {
    path: 'auction-details', component: DetailsAuctionsComponent
    
  },

  // Dashboard routes >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // { path: '', redirectTo: '/donation-history', pathMatch: 'full' },
  // { path: '**', redirectTo: '/donation-histor>>>>>
  { path: 'dashboard', component: MainComponent
     
  ,canActivate:[combineGuard]

  },

  
  { path: 'dashboard/users', component: UsersAdminComponent ,canActivate:[adminmGuard]  },
  { path: 'dashboard/requests', component: RequestsComponent ,canActivate:[adminmGuard]  },
  { path: 'dashboard/request/view/v/:id', component: VolunteerRequestComponent  ,canActivate:[adminmGuard]},
  { path: 'dashboard/request/view/ex/:id', component: ExaminerRequestComponent ,canActivate:[adminmGuard] },
  { path: 'dashboard/userProfile/volunteer/:id', component: VolunteerProfileComponent ,canActivate:[adminmGuard]  },
  { path: 'dashboard/userProfile/doner/:id', component: DonorProfileComponent ,canActivate:[adminmGuard]},

  { path: 'dashboard/events', component: EventsComponent ,canActivate:[adminoGuard]},
  { path: 'dashboard/events/edit/:id', component: EditEventComponent ,canActivate:[adminoGuard] },
  { path: 'dashboard/events/view/:id', component: ViewEventComponent ,canActivate:[adminoGuard] },
  { path: 'dashboard/events/create', component: CreateEventComponent ,canActivate:[adminoGuard] },

  { path: 'dashboard/auctions', component: AuctionsComponent ,canActivate:[adminoGuard]},
  { path: 'dashboard/auctions/view/:id', component: ViewAuctionComponent ,canActivate:[adminoGuard] },
  { path: 'dashboard/auctions/edit/:id', component: EditAuctionComponent ,canActivate:[adminoGuard]},
  { path: 'dashboard/auctions/create', component: CreateAuctionComponent ,canActivate:[adminoGuard]  },

  { path: 'dashboard/examiner-reports', component: ExaminerReportsComponent ,canActivate:[adminoGuard]  },
  { path: 'dashboard/examiner-reports/report-details/:id', component: ReportDetailsComponent,canActivate:[adminoGuard]  },
  { path: 'dashboard/posts', component: PostsDashboardComponent ,canActivate:[adminmGuard] },
  { path: 'dashboard/posts/create-post', component: CreatePostComponent  ,canActivate:[adminmGuard]},
  { path: 'dashboard/posts/view-post/:id', component: ViewPostComponent ,canActivate:[adminmGuard]},
  { path: 'dashboard/posts/edit-post/:id', component: EditPostComponent,canActivate:[adminmGuard]  },

  { path: 'dashboard', component: MainComponent  ,},
  { path: 'dashboard/users', component: UsersAdminComponent ,},
  { path: 'dashboard/requests', component: RequestsComponent, },
  { path: 'dashboard/request/view/v', component: VolunteerRequestComponent, },
  { path: 'dashboard/request/view/ex', component: ExaminerRequestComponent , },
  { path: 'dashboard/userProfile/volunteer', component: VolunteerProfileComponent ,},
  { path: 'dashboard/userProfile/doner', component: DonorProfileComponent ,},
  { path: 'dashboard', component: MainComponent },
  { path: 'dashboard/users', component: UsersAdminComponent },

  { path: 'dashboard/requests', component: RequestsComponent },
  { path: 'dashboard/request/view/v/:id', component: VolunteerRequestComponent },
  { path: 'dashboard/request/view/ex/:id', component: ExaminerRequestComponent },
  { path: 'dashboard/userProfile/volunteer/:id', component: VolunteerProfileComponent },
  { path: 'dashboard/userProfile/doner/:id', component: DonorProfileComponent },

  { path: 'dashboard/events', component: EventsComponent },
  { path: 'dashboard/events/edit/:id', component: EditEventComponent },
  { path: 'dashboard/events/view/:id', component: ViewEventComponent },
  { path: 'dashboard/events/create', component: CreateEventComponent },

  { path: 'dashboard/auctions', component: AuctionsComponent },
  { path: 'dashboard/auctions/view/:id', component: ViewAuctionComponent },
  { path: 'dashboard/auctions/edit/:id', component: EditAuctionComponent },
  { path: 'dashboard/auctions/create', component: CreateAuctionComponent },
  { path: 'dashboard/item/view/:id', component: ViewValuableItemsComponent },
  

  { path: 'dashboard/examiner-reports', component: ExaminerReportsComponent },
  { path: 'dashboard/examiner-reports/report-details/:id', component: ReportDetailsComponent },
  { path: 'dashboard/posts', component: PostsDashboardComponent },
  { path: 'dashboard/posts/create-post', component: CreatePostComponent },
  { path: 'dashboard/posts/view-post/:id', component: ViewPostComponent },
  { path: 'dashboard/posts/edit-post/:id', component: EditPostComponent },



  // dashboard Routs End


 
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'management', component: UserManagementComponent 
    ,canActivate:[adminGuard]
  },
  { path: 'add-sub-admin', component: AddSubAdminComponent
    ,canActivate:[adminGuard]
   },
  { path: 'view-sub-admin/:id', component: ViewSubAdminComponent
    ,canActivate:[adminGuard]
   },
  { path: 'edit-sub-admin/:id', component: EditSubAdminComponent 
    ,canActivate:[adminGuard]
  },
  { path: 'pendingLands', component: AvailableLandsComponent
    ,canActivate:[volunteerGuard]
   },
  { path: 'blog', component: BlogComponent 
   
  },
  { path: 'blog/:id', component: BlogDetailsComponent

   },


  { path: 'listing-auctions' , component: ListingAuctionsComponent
    ,canActivate:[authGuard]
  },
  { path: 'details-auctions' , component:DetailsAuctionsComponent
    ,canActivate:[authGuard]
  },
 
  { path: 'land-inspection', component: LandInspectionComponent
    ,canActivate:[volunteerGuard]
   },
  {path:'contact-us',component:ContactUsComponent
   
  },
  

  { path: 'unauthorized', component: UnauthorizedComponent } ,
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
{ path : 'auction-payment',component:AuctionPaymentPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}




