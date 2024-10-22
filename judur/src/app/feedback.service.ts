import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Feedback {
  id: number;
  user: any; 
  feedback: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8000/api/feedback';
  private apiUrlf = 'http://localhost:8000/api/feedbacks';



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

  deleteFeedback(feedbackId: number): Observable<void> {
    const token = localStorage.getItem('auth_token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.apiUrlf}/${feedbackId}`, { headers });
  }
}
