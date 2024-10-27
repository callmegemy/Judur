import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [SidebarComponent,TopbarComponent],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent {
  postForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) {
    this.postForm = this.fb.group({
      title: ['Post Title 1', Validators.required],
      profilePicture: [''],
      content: ['Current content of the post...', Validators.required],
      category: ['news'] // Default category
    });
  }

  onUpdate() {
    if (this.postForm.valid) {
      // Handle update logic
      console.log(this.postForm.value);
    }
  }
  goBack() {
    this.router.navigate(['dashboard/posts']);
  }
}
