import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { RouterModule, RouterOutlet } from '@angular/router'; 
import { DonationHistoryComponent } from './components/donation-history/donation-history.component';
import { compileNgModule } from '@angular/compiler';
import { CommonModule } from '@angular/common';

import { ViewProfileComponent } from './components/view-profile/view-profile.component'; 
import { EditProfileComponent } from './components/edit-profile/edit-profile.component'; 
import { MainComponent } from './components/dashboard/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet,NavbarComponent,DonationHistoryComponent , CommonModule ,ViewProfileComponent,
    EditProfileComponent, MainComponent, EventListComponent, EventDetailsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'judur';
}
