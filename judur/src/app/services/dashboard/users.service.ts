import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getDonors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/donors`);
  }

  getVolunteers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/volunteers`);
  }

  getDonorDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/donor/${id}`);
  }

  getVolunteerDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/volunteer/${id}`);
  }

}
