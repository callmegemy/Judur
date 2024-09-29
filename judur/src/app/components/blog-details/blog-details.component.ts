import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  imports: [CommonModule, FormsModule],
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

  comments: any[] = [
    // ... Keep existing comments ...
  ];

  newComment: any = {
    name: '',
    email: '',
    website: '',
    message: ''
  };

  searchKeyword: string = '';

  recentPosts: any[] = [
    { image: 'assets/img/carousel-3.jpg', title: 'Lorem ipsum dolor sit amet consec adipis elit', author: 'Admin', category: 'Judur', id: 0 },
    { image: 'assets/img/blog-1.jpg', title: 'Lorem ipsum dolor sit amet consec adipis elit', author: 'Admin', category: 'Judur', id: 1 },
    { image: 'assets/img/blog-2.jpg', title: 'Lorem ipsum dolor sit amet consec adipis elit', author: 'Admin', category: 'Judur', id: 2 },
    { image: 'assets/img/blog-3.jpg', title: 'Lorem ipsum dolor sit amet consec adipis elit', author: 'Admin', category: 'Judur', id: 3 },
  ];

  sidebarImage1: string = 'assets/img/blog-1.jpg';

  activeTab: string = 'featured';

  featuredPosts: any[] = [
    { image: 'assets/img/blog-1.jpg', title: 'Featured: Lorem ipsum dolor sit amet', author: 'Admin', category: 'Judur', id: 1 },
    { image: 'assets/img/blog-2.jpg', title: 'Featured: Consectetur adipiscing elit', author: 'Admin', category: 'Judur', id: 2 },
    { image: 'assets/img/carousel-3.jpg', title: 'Featured: Sed do eiusmod tempor incididunt', author: 'Admin', category: 'Judur', id: 0 },
  ];

  popularPosts: any[] = [
    { image: 'assets/img/blog-2.jpg', title: 'Popular: Ut labore et dolore magna aliqua', author: 'Editor', category: 'Judur', id: 2 },
    { image: 'assets/img/blog-3.jpg', title: 'Popular: Quis nostrud exercitation ullamco', author: 'Editor', category: 'Judur', id: 3 },
    { image: 'assets/img/blog-2.jpg', title: 'Popular: Duis aute irure dolor in reprehenderit', author: 'Editor', category: 'Judur', id: 2 },
  ];

  latestPosts: any[] = [
    { image: 'assets/img/carousel-3.jpg', title: 'Latest: Excepteur sint occaecat cupidatat', author: 'Writer', category: 'Judur', id: 0 },
    { image: 'assets/img/blog-1.jpg', title: 'Latest: Non proident, sunt in culpa qui', author: 'Writer', category: 'Judur', id: 1 },
    { image: 'assets/img/blog-2.jpg', title: 'Latest: Officia deserunt mollit anim id est', author: 'Writer', category: 'Judur', id: 2 },
  ];

  textWidgetContent: string = 'Lorem ipsum dolor sit amet elit. Integer lorem augue purus mollis sapien, non eros leo in nunc. Donec a nulla vel turpis tempor ac vel justo. In hac platea nec eros. Nunc eu enim non turpis id augue.';

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
      id: 1,
      imgSrc: "assets/img/blog-1.jpg",
      title: "Consectetur adipiscing elit",
      description: "Consectetur adipiscing elit. Nulla condimentum tortor sem, in semper nisl bibendum eu.",
      author: "Jane Doe",
      comments: 10,
      content: "Consectetur adipiscing elit. Nulla condimentum tortor sem, in semper nisl bibendum eu. Fusce vel turpis in tellus faucibus malesuada. Donec in est et urna faucibus eleifend. Nullam tincidunt, nunc vitae aliquam dapibus, velit dolor convallis velit, vel bibendum nisi nunc vel augue."
    },
    {
      id: 2,
      imgSrc: "assets/img/blog-2.jpg",
      title: "Consectetur adipiscing elit",
      description: "Consectetur adipiscing elit. Nulla condimentum tortor sem, in semper nisl bibendum eu.",
      author: "Jane Doe",
      comments: 10,
      content: "Consectetur adipiscing elit. Nulla condimentum tortor sem, in semper nisl bibendum eu. Fusce vel turpis in tellus faucibus malesuada. Donec in est et urna faucibus eleifend. Nullam tincidunt, nunc vitae aliquam dapibus, velit dolor convallis velit, vel bibendum nisi nunc vel augue."
    },
    {
      id: 3,
      imgSrc: "assets/img/blog-3.jpg",
      title: "Consectetur adipiscing elit",
      description: "Consectetur adipiscing elit. Nulla condimentum tortor sem, in semper nisl bibendum eu.",
      author: "Jane Doe",
      comments: 10,
      content: "Consectetur adipiscing elit. Nulla condimentum tortor sem, in semper nisl bibendum eu. Fusce vel turpis in tellus faucibus malesuada. Donec in est et urna faucibus eleifend. Nullam tincidunt, nunc vitae aliquam dapibus, velit dolor convallis velit, vel bibendum nisi nunc vel augue."
    },
    // ... Add more blog posts here ...
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.loadPostDetails(id);
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
