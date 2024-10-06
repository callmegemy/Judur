import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { PostService,Post } from '../../../services/post.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [SidebarComponent,TopbarComponent,CommonModule],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent {
  post: Post | null = null;

    constructor( private route: ActivatedRoute,private router: Router, private postService: PostService) {}

    ngOnInit(): void {
      const postId = this.route.snapshot.paramMap.get('id'); // Change 'id' to match your route parameter name
      if (postId) {
        this.postService.getPost(+postId).subscribe(
          (data: Post) => {
            this.post = data;
          },
          (error) => {
            console.error('Error fetching post', error);
          }
        );
      }
    }

    goBack(): void {
        this.router.navigate(['dashboard/posts']);
    }
}
