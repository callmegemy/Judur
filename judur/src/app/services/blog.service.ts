import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string; // This should be included
  category: string;
}

export interface Comment {
  id: number; // Assuming you have an ID for each comment
  post_id: number;
  user_id: number; // User who posted the comment
  content: string;
  created_at: string; // Assuming this is the date format you are using
  user?: {
    name: string; // Include user name if needed
  };
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'http://localhost:8000/api/posts'; // URL of your Laravel API
  private commentsApiUrl = 'http://localhost:8000/api/comments'; // URL for comments API
  private usersApiUrl = 'http://localhost:8000/api/users'; // URL for users API

  constructor(private http: HttpClient) {}

  // Fetch all posts
  getPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching posts:', error);
        return throwError(() => new Error('Error fetching posts; please try again later.'));
      })
    );
  }

  // Fetch a single post by ID (optional, for blog details)
  getPost(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching post:', error);
        return throwError(() => new Error('Error fetching post; please try again later.'));
      })
    );
  }

  // Fetch recent posts with an optional limit
  getRecentPosts(limit: number = 10): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}?_limit=${limit}&sort=recent`).pipe(
      catchError((error) => {
        console.error('Error fetching recent posts:', error);
        return throwError(() => new Error('Error fetching recent posts; please try again later.'));
      })
    );
  }

  // Fetch comments for a specific post
  getCommentsByPost(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${postId}/comments`).pipe(
      catchError((error) => {
        console.error('Error fetching comments:', error);
        return throwError(() => new Error('Error fetching comments; please try again later.'));
      })
    );
  }

  // Post a new comment
  addComment(comment: { post_id: number; user_id: number; content: string }): Observable<Comment> {
    console.log(comment);
    return this.http.post<Comment>(this.commentsApiUrl, comment).pipe(
      catchError((error) => {
        console.error('Error posting comment:', error);
        return throwError(() => new Error('Error posting comment; please try again later.'));
      })
    );
  }

  // Fetch user by ID
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.usersApiUrl}/${userId}`).pipe(
      catchError((error) => {
        console.error('Error fetching user:', error);
        return throwError(() => new Error('Error fetching user; please try again later.'));
      })
    );
  }

  // Global error handling function
  private handleError(error: any) {
    console.error('An error occurred:', error); // Log to console for debugging
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  getUserId(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Adjust according to your token structure
    return user.id; // Return the user's ID
  }
}
