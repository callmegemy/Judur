import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {  throwError } from 'rxjs';
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

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching posts:', error);
        return throwError(error);
      })
    );
  }

  // Fetch a single post by ID (optional, for blog details)
  getPost(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/${id}`);
  }

  getRecentPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}?sort=recent`); // Adjust endpoint as necessary
  }
      // Global error handling function
      private handleError(error: any) {
        console.error('An error occurred:', error); // Log to console for debugging

        // Return an observable with a user-facing error message
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }
}
