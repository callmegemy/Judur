import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
export interface Post {
  id: number; // Change this to required
  title: string;
  content?: string;
  image?: string;
  createdAt?: string;
  category: string;
}

@Injectable({
    providedIn: 'root'
})
export class PostService {

    private apiUrl = 'http://localhost:8000/api/posts'; // Adjust to your Laravel URL

    constructor(private http: HttpClient) { }

    // Get all posts
    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.apiUrl).pipe(
            catchError(this.handleError) // Handle errors globally
        );
    }

    // Create a new post
    createPost(post: FormData): Observable<Post> {
        // Set headers for form data (optional if Laravel automatically handles it)
        const headers = new HttpHeaders({
            'Accept': 'application/json'
        });

        return this.http.post<Post>(this.apiUrl, post, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    // Get a single post by ID
    getPost(id: number): Observable<Post> {
        return this.http.get<Post>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    // Update a post by ID
 // Update a post by ID
 updatePost(id: number, postData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, postData).pipe(
        catchError(this.handleError)
    );
}

    // Delete a post by ID
    deletePost(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    // Global error handling function
    private handleError(error: any) {
        console.error('An error occurred:', error); // Log to console for debugging

        // Return an observable with a user-facing error message
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }
}