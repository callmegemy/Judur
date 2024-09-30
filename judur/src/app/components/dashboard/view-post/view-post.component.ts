import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent {
  post = {
    title: 'Post Title 1',
    content: 'This is the detailed content of the post...',
    createdAt: '2024-09-20',
    image: 'assets/img/feeding.png'
  };
  constructor(private router: Router){}
  ngOnInit() {
    // Fetch the post details based on the post ID or other parameters
  }
  goBack() {
    this.router.navigate(['/posts']);
  }
}
