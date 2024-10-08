import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { Observable } from 'rxjs';
import { BlogService } from '../../services/blog.service';
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
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  mainImage: string = '';
  postTitle: string = '';
  postContent: string = '';

  authorImage: string = 'assets/img/author-1.jpg';
  authorName: string = 'Author Name';
  authorBio: string = 'Lorem ipsum dolor sit amet elit. Integer lorem augue purus mollis sapien, non eros leo in nunc. Donec a nulla vel turpis tempor ac vel justo. In hac platea dictumst.';

  comments: any[] = []; // Initialize comments array

  newComment: any = {
    name: '',
    email: '',
    website: '',
    message: ''
  };

  searchKeyword: string = '';

  recentPosts: any[] = [];
  sidebarImage1: string = 'assets/img/blog-1.jpg';

  activeTab: string = 'featured';

  featuredPosts: any[] = []; // Initialize to fetch from service
  popularPosts: any[] = []; // Initialize to fetch from service
  latestPosts: any[] = []; // Initialize to fetch from service

  textWidgetContent: string = 'Lorem ipsum dolor sit amet elit. Integer lorem augue purus mollis sapien, non eros leo in nunc. Donec a nulla vel turpis tempor ac vel justo. In hac platea nec eros. Nunc eu enim non turpis id augue.';

  blogPosts: BlogPost[] = [
    // ... Keep your existing blog posts here ...
  ];

  constructor(private route: ActivatedRoute, private blogService: BlogService) { } // Inject BlogService

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.loadPostDetails(id);
    });

    // Fetch recent posts from the service
    this.blogService.getRecentPosts().subscribe((posts: any[]) => { // Ensure to type your posts
      this.recentPosts = posts;
    }, (error: any) => { // Type the error parameter
      console.error('Error fetching recent posts:', error);
    });
  }

  loadPostDetails(id: number): void {
    const post = this.blogPosts.find(p => p.id === id);
    if (post) {
      this.mainImage = post.imgSrc;
      this.postTitle = post.title;
      this.postContent = post.content;
      this.authorName = post.author;
      // You can add more properties here as needed
    } else {
      console.error('Post not found');
      // Handle the case when the post is not found (e.g., redirect to 404 page)
    }
  }

  onPostClick(postId: number): void {
    this.loadPostDetails(postId);
  }

  onSubmitComment(): void {
    // Handle comment submission
    console.log('New comment:', this.newComment);
    // Reset form after submission
    this.newComment = { name: '', email: '', website: '', message: '' };
  }

  onSearch(): void {
    // Handle search
    console.log('Search keyword:', this.searchKeyword);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
