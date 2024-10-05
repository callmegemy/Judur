import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }
  getVolunteerRequests(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pending-volunteers`);
  }

  getVolunteerDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/volunteer/${id}`);
  }

    updateVolunteerStatus(id: number, status: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/volunteer/${id}/status`, { status });
    }

    getExaminerRequests(): Observable<any> {
      return this.http.get(`${this.apiUrl}/pending-examiners`);
    }

    getExaminerDetails(id: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/examiner/${id}`);
    }

    updateExaminerStatus(id: number, status: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/examiner/${id}/status`, { status });
    }
}
