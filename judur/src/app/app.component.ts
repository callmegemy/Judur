import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { RouterModule, RouterOutlet } from '@angular/router'; 
import { DonationHistoryComponent } from './components/donation-history/donation-history.component';
import { compileNgModule } from '@angular/compiler';
import { CommonModule } from '@angular/common';

import { ViewProfileComponent } from './components/view-profile/view-profile.component'; 
import { EditProfileComponent } from './components/edit-profile/edit-profile.component'; 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet,DonationHistoryComponent , CommonModule ,ViewProfileComponent,
    EditProfileComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'judur';
}
