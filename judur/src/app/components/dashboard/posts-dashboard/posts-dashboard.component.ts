import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService , Post} from '../../../services/post.service';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
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
  posts: Post[] = [];
  postForm: FormGroup;
  constructor(private fb: FormBuilder, private postService: PostService,private router: Router ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      profilePicture: [''],
      content: ['', Validators.required],
      category: ['news'] 
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
  

  createPost(): void {
    this.router.navigate(['/dashboard/posts/create-post']);
   
  }


  viewPost(postId: number) {
    this.router.navigate(['/dashboard/posts/view-post', postId]);
  }
  editPost(id: number | undefined): void {
    if (id !== undefined) {
        this.router.navigate(['/dashboard/posts/edit-post', id]);
        this.postService.getPost(id).subscribe(post => {
            const updatedTitle = prompt('Edit Title:', post.title);
            const updatedContent = prompt('Edit Content:', post.content);

            if (updatedTitle !== null && updatedContent !== null) {
                const formData = new FormData();
                formData.append('title', updatedTitle);
                formData.append('content', updatedContent);
                
                // If there's an image to upload, append it as well
                // formData.append('image', selectedImageFile);

                this.postService.updatePost(id, formData).subscribe(updatedPost => {
                    // Update the posts array with the updated post
                    const index = this.posts.findIndex(p => p.id === id);
                    if (index !== -1) {
                        this.posts[index] = updatedPost;
                    }
                });
            }
        });
    } else {
        console.error("Post ID is undefined");
    }
}

deletePost(id: number | undefined): void {
    if (id !== undefined) {
        this.postService.deletePost(id).subscribe(() => {
            this.posts = this.posts.filter(post => post.id !== id);
        });
    } else {
        console.error("Post ID is undefined");
    }
}



}
