import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { SidebarComponent } from '../sidebar/sidebar.component'; // Ensure this is standalone
import { TopbarComponent } from '../topbar/topbar.component'; // Ensure this is standalone
import $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-posts-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe, SidebarComponent, TopbarComponent, FormsModule, NgxPaginationModule, RouterLink],
  templateUrl: './posts-dashboard.component.html',
  styleUrls: ['./posts-dashboard.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class PostsDashboardComponent implements AfterViewInit {
  posts: any[] = [];
  private postsTable: any;

  constructor(
    private postsService: PostService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  ngAfterViewInit(): void {
    this.initializeDataTables();
  }

  ngOnDestroy(): void {
    if (this.postsTable) {
      this.postsTable.destroy(true);
    }
  }

  fetchPosts() {
    this.postsService.getPosts().subscribe(
      data => {
        console.log('Posts fetched:', data);
        this.posts = data;
        this.cdr.detectChanges();
        this.initializeDataTables();
      },
      error => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  initializeDataTables() {
    setTimeout(() => {
      if (this.posts.length > 0) {
        if (this.postsTable) {
          this.postsTable.destroy();
        }
        this.postsTable = $('#dataTable').DataTable();
      }
    }, 0);
  }

  onDelete(postId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the post!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.postsService.deletePost(postId).subscribe(
          response => {
            console.log('Post deleted successfully', response);
            Swal.fire('Deleted!', 'The post has been deleted.', 'success').then(() => {
              location.reload();
            });
          },
          error => {
            console.error('Error occurred while deleting post', error);
            Swal.fire('Error!', 'Failed to delete the post.', 'error');
          }
        );
      }
    });
  }
 
}
