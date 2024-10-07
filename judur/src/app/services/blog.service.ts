import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient for API calls
import { Observable } from 'rxjs';

export interface BlogPost {
  id: number;
  title: string;
  description: string; // Assuming you have this in your API response
  content: string;
  image: string; // Assuming 'image' comes from the API
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  getRecentPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}?sort=recent`);  // Adjust endpoint as necessary
  }
  private apiUrl = 'http://localhost:8000/api/posts';  // URL of your Laravel API

  constructor(private http: HttpClient) {}

  // Fetch all posts
  getPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.apiUrl);  // GET request to fetch posts from backend
  }

  // Fetch a single post by ID (optional, for blog details)
  getPost(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/${id}`);
  }
}
