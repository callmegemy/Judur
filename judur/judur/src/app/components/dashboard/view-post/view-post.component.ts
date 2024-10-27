import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [SidebarComponent,TopbarComponent],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent {
  post = {
    title: 'Post Title 1',
    content: 'This is the detailed content of the post...',
    createdAt: '2024-09-20',
    image: 'assets/img/feeding.png'
  };
  constructor(private router: Router) {}
    ngOnInit() {
    
  }
  goBack() {
    this.router.navigate(['dashboard/posts']);
  }
}
