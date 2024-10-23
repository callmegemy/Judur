import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';

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
  comments: any[] = [];
  commentContent: string = '';
  recentPosts: any[] = [];
  sidebarImage1: string = 'assets/img/blog-1.jpg';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.loadPostDetails(id);
      this.loadComments(id);
    });

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

      this.comments.forEach(comment => {
        const userId = comment.user_id;
        this.blogService.getUserById(userId).subscribe(user => {
          comment.user = user;
        });
      });
    }, (error: any) => {
      console.error('Error fetching comments:', error);
    });
  }

  submitComment(): void {
    const userId = this.authService.getUserId();
    const postId = Number(this.route.snapshot.paramMap.get('id'));

    this.blogService.addComment({ post_id: postId, user_id: userId, content: this.commentContent })
      .subscribe(response => {
        this.blogService.getUserById(userId).subscribe(user => {
          response.user = user;
          this.comments.unshift(response);
          this.commentContent = '';
        });
      }, (error: any) => {
        console.error('Error posting comment:', error);
      });
  }

  onPostClick(postId: number): void {
    this.loadPostDetails(postId);
  }

  getProfilePictureUrl(picture: string): string {
    return picture ? `http://127.0.0.1:8000/storage/${picture}` : 'assets/img/profile-picture.jpg';
  }

  shareOnFacebook(): void {
    const postId = this.route.snapshot.paramMap.get('id'); 
    const ngrokUrl = `https://323e-102-185-35-68.ngrok-free.app/blog/${postId}`;
    const title = encodeURIComponent(this.postTitle);
    const image = encodeURIComponent(this.mainImage);
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ngrokUrl)}&quote=${title}&picture=${image}`;
  
    window.open(facebookShareUrl, '_blank');
  }
}
