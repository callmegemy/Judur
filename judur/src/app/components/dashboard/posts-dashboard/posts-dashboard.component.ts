import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-posts-dashboard',
  standalone: true,
  imports: [CommonModule,DatePipe,SidebarComponent,TopbarComponent],
  templateUrl: './posts-dashboard.component.html',
  styleUrl: './posts-dashboard.component.css'
})
export class PostsDashboardComponent {
  posts = [
    {
      id: 1, // Ensure to keep the id property
      title: 'Post Title 1',
      createdAt: '2024-09-20', // Change 'date' to 'createdAt'
      image: 'assets/img/feeding.png'
    },
    {
      id: 2,
      title: 'Post Title 2',
      createdAt: '2024-09-19', // Change 'date' to 'createdAt'
      image: 'assets/img/feeding.png'
    },
    {
      id: 3,
      title: 'Post Title 3',
      createdAt: '2024-09-18', // Change 'date' to 'createdAt'
      image: 'assets/img/feeding.png'
    }
  ];
  constructor(private router: Router  ) {} // Inject Router
  createPost() {
    this.router.navigate(['/dashboard/posts/create-post']);
  }
  
  viewPost(postId: number) {
    this.router.navigate(['/dashboard/posts/view-post', postId]);
  }
  
  editPost(postId: number) {
    this.router.navigate(['/dashboard/posts/edit-post', postId]);
  }

   deletePost(postId: number): void {
    // Filter out the post with the matching ID (for demo purposes)
    this.posts = this.posts.filter(post => post.id !== postId);
    console.log(`Post with id ${postId} deleted`);
  }
}
