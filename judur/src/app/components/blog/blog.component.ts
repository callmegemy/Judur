import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

interface BlogPost {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
  author: string;
  comments: number;
  content: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blogPosts: BlogPost[] = [
    {
      id: 0,
      imgSrc: "assets/img/carousel-3.jpg",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor",
      author: "Admin",
      comments: 15,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie, lorem eu eleifend bibendum, augue purus mollis sapien, non rhoncus eros leo in nunc. Donec a nulla vel turpis consectetur tempor ac vel justo. In hac habitasse platea dictumst."
    },
    {
      id: 3,
      imgSrc: "assets/img/blog-3.jpg",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor",
      author: "Admin",
      comments: 15,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie, lorem eu eleifend bibendum, augue purus mollis sapien, non rhoncus eros leo in nunc. Donec a nulla vel turpis consectetur tempor ac vel justo. In hac habitasse platea dictumst."
    },
    {
      id: 1,
      imgSrc: "assets/img/blog-1.jpg",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor",
      author: "Admin",
      comments: 15,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie, lorem eu eleifend bibendum, augue purus mollis sapien, non rhoncus eros leo in nunc. Donec a nulla vel turpis consectetur tempor ac vel justo. In hac habitasse platea dictumst."
    },
    {
      id: 2,
      imgSrc: "assets/img/blog-2.jpg",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor",
      author: "Admin",
      comments: 15,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie, lorem eu eleifend bibendum, augue purus mollis sapien, non rhoncus eros leo in nunc. Donec a nulla vel turpis consectetur tempor ac vel justo. In hac habitasse platea dictumst."
    },
    {
      id: 0,
      imgSrc: "assets/img/carousel-3.jpg",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor",
      author: "Admin",
      comments: 15,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie, lorem eu eleifend bibendum, augue purus mollis sapien, non rhoncus eros leo in nunc. Donec a nulla vel turpis consectetur tempor ac vel justo. In hac habitasse platea dictumst."
    },
    {
      id: 3,
      imgSrc: "assets/img/blog-3.jpg",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor",
      author: "Admin",
      comments: 15,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie, lorem eu eleifend bibendum, augue purus mollis sapien, non rhoncus eros leo in nunc. Donec a nulla vel turpis consectetur tempor ac vel justo. In hac habitasse platea dictumst."
    },
    {
      id: 1,
      imgSrc: "assets/img/blog-1.jpg",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor",
      author: "Admin",
      comments: 15,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie, lorem eu eleifend bibendum, augue purus mollis sapien, non rhoncus eros leo in nunc. Donec a nulla vel turpis consectetur tempor ac vel justo. In hac habitasse platea dictumst."
    },
    {
      id: 2,
      imgSrc: "assets/img/blog-2.jpg",
      title: "Lorem ipsum dolor sit",
      description: "Lorem ipsum dolor sit amet elit. Neca pretim miura bitur facili ornare velit non vulpte liqum metus tortor",
      author: "Admin",
      comments: 15,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie, lorem eu eleifend bibendum, augue purus mollis sapien, non rhoncus eros leo in nunc. Donec a nulla vel turpis consectetur tempor ac vel justo. In hac habitasse platea dictumst."
    },
    // Add more blog posts here...
  ];

  currentPage: number = 1;
  pageSize: number = 6;

  get paginatedPosts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.blogPosts.slice(startIndex, startIndex + this.pageSize);
  }
}
