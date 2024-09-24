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
export const routes: Routes = [
  { path: 'landowner-registration', component: LandownerRegistrationComponent },
  { path: 'volunteer-registration', component: VolunteerRegistrationComponent },
  { path: 'auction', component: AuctionComponent },
  { path: 'volunteer-to-examiner', component: VolunteerToExaminerComponent },
  { path: 'donation-history', component: DonationHistoryComponent },

  // Donation details routes by category
  { path: 'donation-item-details/:id', component: DonationItemDetailsComponent },
  { path: 'donation-money-details/:id', component: DonationMoneyDetailsComponent },
  { path: 'donation-land-details/:id', component: DonationLandDetailsComponent },

  // { path: 'view-profile', component: ViewProfileComponent},
  { path: '', component: ViewProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
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
