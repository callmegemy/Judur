import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { PostService, Post } from '../../../services/post.service';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [SidebarComponent,TopbarComponent,ReactiveFormsModule,CommonModule ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  postForm: FormGroup;
  posts: Post[] = [];
  constructor(private fb: FormBuilder, private router: Router, private postService: PostService) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      profilePicture: [''],
      content: ['', Validators.required],
      category: ['', Validators.required] // Add Validators.required here
  });
  }
  ngOnInit(): void {}
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const file = target.files[0];
        this.postForm.patchValue({ profilePicture: file });
        this.postForm.get('profilePicture')?.updateValueAndValidity(); // Ensure validation is updated
    }
}

  onSubmit() {
    console.log('Form values:', this.postForm.value);
    if (this.postForm.valid) {
        const formData = new FormData();
        formData.append('title', this.postForm.value.title); // Ensure this line is correct
        formData.append('content', this.postForm.value.content);
        formData.append('category', this.postForm.value.category);
        
        if (this.postForm.value.profilePicture) {
            formData.append('image', this.postForm.value.profilePicture);
        }

        this.postService.createPost(formData).subscribe(
            post => {
                console.log('Post created successfully:', post);
                this.router.navigate(['dashboard/posts']);
            },
            error => {
                console.error('Error creating post:', error);
            }
        );
    } else {
        console.log('Form is invalid:', this.postForm.errors);
    }
}

  goBack() {
    this.router.navigate(['dashboard/posts']);
  }
}
