import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  mainImage: string = '';
  postTitle: string = '';
  postContent: string = '';

  recentPosts: any[] = [];
  sidebarImage1: string = 'assets/img/blog-1.jpg';

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.loadPostDetails(id);
    });

    // Fetch recent posts from the service with a limit of 10
    this.blogService.getRecentPosts(10).subscribe((posts: any[]) => {
      this.recentPosts = posts;
    }, (error: any) => {
      console.error('Error fetching recent posts:', error);
    });
  }

  loadPostDetails(id: number): void {
    this.blogService.getPost(id).subscribe(post => {
      this.mainImage = post.image;
      this.postTitle = post.title;
      this.postContent = post.content;
    }, (error: any) => {
      console.error('Error fetching post details:', error);
    });
  }

  onPostClick(postId: number): void {
    this.loadPostDetails(postId);
  }
}
