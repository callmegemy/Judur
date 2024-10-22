import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { PostService, Post } from '../../../services/post.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { BlogService, Comment } from '../../../services/blog.service';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, CommonModule],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent {
  user: any;
  loggedIn: boolean = false;
  post: Post | null = null;
  comments: Comment[] = [];
  isAdmin: boolean = false;


  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,

    private router: Router,
    private postService: PostService,
    private commentService: BlogService
  ) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.postService.getPost(+postId).subscribe(
        (data: Post) => {
          this.post = data;
          this.loadComments(+postId);
        },
        (error) => {
          console.error('Error fetching post', error);
        }
      );
    }

    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;

      if (this.loggedIn) {
        const user = this.authService.getUserData();
        this.user = user;

        if (user) {
          if (user.role_id === 1) {
            this.isAdmin = true;
          }
        }
      }
    });
  }

  loadComments(postId: number): void {
    this.commentService.getCommentsByPost(postId).subscribe(
      (comments: Comment[]) => {
        this.comments = comments;
      },
      (error) => {
        console.error('Error fetching comments', error);
      }
    );
  }

  deleteComment(commentId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.commentService.deleteComment(commentId).subscribe(
          () => {
            Swal.fire(
              'Deleted!',
              'The comment has been deleted.',
              'success'
            );
            this.loadComments(this.post?.id!); // Reload the comments after deletion
          },
          (error) => {
            console.error('Error deleting comment:', error);
            Swal.fire(
              'Error!',
              'There was an error deleting the comment.',
              'error'
            );
          }
        );
      }
    });
  }


  goBack(): void {
    this.router.navigate(['dashboard/posts']);
  }
}
