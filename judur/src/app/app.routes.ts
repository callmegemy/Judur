import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  
// import { LandownerRegistrationComponent } from './landowner-registration/landowner-registration.component';
// import { VolunteerRegistrationComponent } from './volunteer-registration/volunteer-registration.component';
// import { AuctionComponent } from './auction/auction.component';
// import { VolunteerToExaminerComponent } from './volunteer-to-examiner/volunteer-to-examiner.component'; 
// import { DonationHistoryComponent } from './donation-history/donation-history.component'; 
// import { DonationItemDetailsComponent } from './donation-item-details/donation-item-details.component';
// import { DonationMoneyDetailsComponent } from './donation-money-details/donation-money-details.component';
// import { DonationLandDetailsComponent } from './donation-land-details/donation-land-details.component'; 

export const routes: Routes = [
//   { path: 'landowner-registration', component: LandownerRegistrationComponent },
//   { path: 'volunteer-registration', component: VolunteerRegistrationComponent },
//   { path: 'auction', component: AuctionComponent },
//   { path: 'volunteer-to-examiner', component: VolunteerToExaminerComponent },
//   { path: 'donation-history', component: DonationHistoryComponent },

  
//   { path: 'donation-item-details/:id', component: DonationItemDetailsComponent },
//   { path: 'donation-money-details/:id', component: DonationMoneyDetailsComponent },
//   { path: 'donation-land-details/:id', component: DonationLandDetailsComponent },

  { path: '', redirectTo: '/donation-history', pathMatch: 'full' },
  { path: '**', redirectTo: '/donation-history' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
