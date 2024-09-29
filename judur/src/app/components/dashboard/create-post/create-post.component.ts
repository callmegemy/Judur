import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [SidebarComponent,TopbarComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  postForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      profilePicture: [''],
      content: ['', Validators.required],
      category: ['news'] // Default category
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      // Handle form submission logic
      console.log(this.postForm.value);
    }
  }
  goBack() {
    this.router.navigate(['dashboard/posts']);
  }

}
