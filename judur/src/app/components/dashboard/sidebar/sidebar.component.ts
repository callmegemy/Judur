import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  user: any;
  loggedIn: boolean = false;
  isadmin:boolean=false;
  isMentor: boolean = false;
  isOrganizer: boolean = false;
  constructor(
    private router: Router,
    public authService: AuthService,
  ) {}
  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
      
      if (this.loggedIn) {
        const user = this.authService.getUserData();
        this.user = user; 
  
        if (user) {
          if (user.role_id == 5 || user.role_id == 1) { 
            this.isOrganizer = true;

          }
          if (user.role_id == 1 ) { 
            this.isadmin= true;
          }
        
          if (user.role_id == 6 || user.role_id == 1) { 
            
           this.isMentor = true;

          }
        }
      }
    });
    
  }
  

}
