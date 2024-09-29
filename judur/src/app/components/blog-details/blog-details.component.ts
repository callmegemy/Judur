import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  mainImage: string = 'assets/img/blog-1.jpg';
  postTitle: string = 'Lorem ipsum dolor sit amet';
  postContent: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie, lorem eu eleifend bibendum, augue purus mollis sapien, non rhoncus eros leo in nunc. Donec a nulla vel turpis consectetur tempor ac vel justo. In hac habitasse platea dictumst. Cras nec sollicitudin eros. Nunc eu enim non turpis sagittis rhoncus consectetur id augue. Mauris dignissim neque felis. Phasellus mollis mi a pharetra cursus. Maecenas vulputate augue placerat lacus mattis, nec ornare risus sollicitudin.';

  authorImage: string = 'assets/img/author-1.jpg';
  authorName: string = 'Author Name';
  authorBio: string = 'Lorem ipsum dolor sit amet elit. Integer lorem augue purus mollis sapien, non eros leo in nunc. Donec a nulla vel turpis tempor ac vel justo. In hac platea dictumst.';

  comments: any[] = [
    {
      userImage: 'assets/img/commenter-1.jpeg',
      userName: 'Josh Dunn',
      date: new Date('2045-01-01T12:00:00'),
      content: 'Lorem ipsum dolor sit amet elit. Integer lorem augue purus mollis sapien, non eros leo in nunc. Donec a nulla vel turpis tempor ac vel justo. In hac platea dictumst.',
      replies: [
        {
          userImage: 'assets/img/commenter-2.jpeg',
          userName: 'Josh Dunn',
          date: new Date('2045-01-01T12:00:00'),
          content: 'Lorem ipsum dolor sit amet elit. Integer lorem augue purus mollis sapien, non eros leo in nunc. Donec a nulla vel turpis tempor ac vel justo. In hac platea dictumst.'
        }
      ]
    },
    // Add more comments...
  ];

  newComment: any = {
    name: '',
    email: '',
    website: '',
    message: ''
  };

  searchKeyword: string = '';

  recentPosts: any[] = [
    { image: 'assets/img/blog-1.jpg', title: 'Lorem ipsum dolor sit amet consec adipis elit', author: 'Admin', category: 'Judur' },
    { image: 'assets/img/blog-2.jpg', title: 'Lorem ipsum dolor sit amet consec adipis elit', author: 'Admin', category: 'Judur' },
    { image: 'assets/img/blog-3.jpg', title: 'Lorem ipsum dolor sit amet consec adipis elit', author: 'Admin', category: 'Judur' },
    { image: 'assets/img/blog-2.jpg', title: 'Lorem ipsum dolor sit amet consec adipis elit', author: 'Admin', category: 'Judur' },
  ];

  sidebarImage1: string = 'assets/img/blog-1.jpg';

  activeTab: string = 'featured';

  featuredPosts: any[] = [
    { image: 'assets/img/blog-2.jpg', title: 'Lorem ipsum dolor sit amet consec adipis elit', author: 'Admin', category: 'Web Design' },
    { image: 'assets/img/blog-3.jpg', title: 'Lorem ipsum dolor sit amet consec adipis elit', author: 'Admin', category: 'Web Design' },
    { image: 'assets/img/blog-1.jpg', title: 'Lorem ipsum dolor sit amet consec adipis elit', author: 'Admin', category: 'Web Design' },
    { image: 'assets/img/blog-2.jpg', title: 'Lorem ipsum dolor sit amet consec adipis elit', author: 'Admin', category: 'Web Design' },
    { image: 'assets/img/blog-3.jpg', title: 'Lorem ipsum dolor sit amet consec adipis elit', author: 'Admin', category: 'Web Design' },
  ];

  textWidgetContent: string = 'Lorem ipsum dolor sit amet elit. Integer lorem augue purus mollis sapien, non eros leo in nunc. Donec a nulla vel turpis tempor ac vel justo. In hac platea nec eros. Nunc eu enim non turpis id augue.';

  constructor() { }

  ngOnInit(): void {
    // Initialize component data, fetch from API if needed
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
