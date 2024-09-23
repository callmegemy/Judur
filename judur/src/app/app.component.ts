import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { RouterModule, RouterOutlet } from '@angular/router'; 
// import { MainHeaderComponent } from './main-header/main-header.component';
// import { DonationHistoryComponent } from './donation-history/donation-history.component'; 
import { compileNgModule } from '@angular/compiler';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'judur';
}
