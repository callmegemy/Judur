import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { BlogService, BlogPost } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  currentPage: number = 1;
  pageSize: number = 6;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getPosts().subscribe({
      next: (posts) => {
        this.blogPosts = posts;
        console.log(posts); // Debug line to check if posts are fetched
      },
      error: (err) => {
        console.error('Failed to fetch posts:', err); // Handle error
      }
    });
  }

  get paginatedPosts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.blogPosts.slice(startIndex, startIndex + this.pageSize);
  }
}
