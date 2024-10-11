import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service'; // Import AuthService to handle user authentication

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
  comments: any[] = []; // Initialize comments array
  commentContent: string = ''; // Store comment input
  recentPosts: any[] = [];
  sidebarImage1: string = 'assets/img/blog-1.jpg';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.loadPostDetails(id);
      this.loadComments(id); // Load comments when post details are loaded
    });

    // Fetch recent posts from the service
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

  loadComments(postId: number): void {
    this.blogService.getCommentsByPost(postId).subscribe(comments => {
      this.comments = comments;

      // Enrich comments with user names and profile pictures
      this.comments.forEach(comment => {
        const userId = comment.user_id;
        this.blogService.getUserById(userId).subscribe(user => {
          comment.user = user; // Assuming the user object contains a `name` and `image` field
        });
      });
    }, (error: any) => {
      console.error('Error fetching comments:', error);
    });
  }

  submitComment(): void {
    const userId = this.authService.getUserId(); // Retrieve the logged-in user's ID
    const postId = Number(this.route.snapshot.paramMap.get('id')); // Get the current post ID

    this.blogService.addComment({ post_id: postId, user_id: userId, content: this.commentContent })
      .subscribe(response => {
        // Enrich the new comment with the user's name and profile picture
        this.blogService.getUserById(userId).subscribe(user => {
          response.user = user; // Add the user info to the new comment
          this.comments.unshift(response); // Add the new comment to the beginning of the comments array
          this.commentContent = ''; // Clear the input field
        });
      }, (error: any) => {
        console.error('Error posting comment:', error);
      });
  }

  onPostClick(postId: number): void {
    this.loadPostDetails(postId);
  }
}
