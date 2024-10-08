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

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'http://localhost:8000/api/posts'; // URL of your Laravel API

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

  // Global error handling function
  private handleError(error: any) {
    console.error('An error occurred:', error); // Log to console for debugging
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
