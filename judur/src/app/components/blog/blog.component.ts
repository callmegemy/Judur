import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule to use RouterLink

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule, // Needed for *ngFor and other common directives
    RouterModule, // Import RouterModule to use RouterLink
  ],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blogPosts = [
    {
      imgSrc: "assets/img/blog-1.jpg",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor",
      author: "Admin",
      comments: 15
    },
    {
      imgSrc: "assets/img/blog-2.jpg",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor",
      author: "Admin",
      comments: 15
    },
    {
      imgSrc: "assets/img/blog-3.jpg",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor",
      author: "Admin",
      comments: 15
    },
    {
      imgSrc: "assets/img/blog-1.jpg",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor",
      author: "Admin",
      comments: 15
    },
    {
      imgSrc: "assets/img/blog-2.jpg",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor",
      author: "Admin",
      comments: 15
    },
    {
      imgSrc: "assets/img/blog-2.jpg",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor",
      author: "Admin",
      comments: 15
    },
    {
      imgSrc: "assets/img/blog-2.jpg",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor",
      author: "Admin",
      comments: 15
    },
    {
      imgSrc: "assets/img/blog-2.jpg",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor",
      author: "Admin",
      comments: 15
    },
    {
      imgSrc: "assets/img/blog-2.jpg",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor",
      author: "Admin",
      comments: 15
    },
    {
      imgSrc: "assets/img/blog-3.jpg",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor",
      author: "Admin",
      comments: 15
    }
  ];

  currentPage: number = 1; // Current page for pagination
  pageSize: number = 6; // Number of posts per page

  get paginatedPosts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.blogPosts.slice(startIndex, startIndex + this.pageSize);
  }
}
