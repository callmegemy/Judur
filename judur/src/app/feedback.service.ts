import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8000/api/feedback';

  constructor(private http: HttpClient) {}

  submitFeedback(feedback: string): Observable<any> {
    const token = localStorage.getItem('auth_token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    const body = { feedback }; 
    return this.http.post(this.apiUrl, body, { headers });

  }

  getFeedback(): Observable<any> {
    const token = localStorage.getItem('auth_token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
