import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faComputerMouse } from '@fortawesome/free-solid-svg-icons';
import { PostService,Post } from '../../../services/post.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [SidebarComponent,TopbarComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent {
  postForm: FormGroup;
  postId: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) {
    // Retrieve the post ID from route parameters
    this.postId = +this.route.snapshot.paramMap.get('id')!; // Assuming the URL has the post ID
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      image: ['']
    });

    // Load the existing post data here if necessary
    this.loadPost();
  }
  loadPost() {
    this.postService.getPost(this.postId).subscribe(post => {
        console.log('Loaded post:', post); // Check if data is correct
        this.postForm.patchValue({
            title: post.title,
            content: post.content,
            category: post.category,
            image: post.image
        });
    });
}
onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  this.postForm.patchValue({ image: file });
}
onUpdate() {
  if (this.postForm.valid) {
    const postData = {
      title: this.postForm.get('title')?.value,
      content: this.postForm.get('content')?.value,
      category: this.postForm.get('category')?.value,
      image: null as string | null // Declare image as string | null
    };

    const imageFile = this.postForm.get('image')?.value;

    if (imageFile instanceof File) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Assert the type of reader.result as string
        postData.image = reader.result as string;

        // Now submit the data to the service
        this.postService.updatePost(this.postId, postData).subscribe(
          (response) => {
            console.log('Post updated successfully!', response);
            this.router.navigate(['dashboard/posts']);
          },
          (error) => {
            console.error('Error updating post', error);
            if (error.error?.errors) {
              console.log('Validation errors:', error.error.errors);
            }
          }
        );
      };

      reader.readAsDataURL(imageFile); // Converts the file to Base64
    } else {
      // If there's no image file, send the rest of the form
      this.postService.updatePost(this.postId, postData).subscribe(
        (response) => {
          console.log('Post updated successfully!', response);
          this.router.navigate(['dashboard/posts']);
        },
        (error) => {
          console.error('Error updating post', error);
          if (error.error?.errors) {
            console.log('Validation errors:', error.error.errors);
          }
        }
      );
    }
  } else {
    console.error('Form is invalid:', this.postForm.errors);
  }
}


  
  goBack() {
    this.router.navigate(['dashboard/posts']);
  }

}
