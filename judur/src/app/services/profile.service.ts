import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://127.0.0.1:8000/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getProfile(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile/${userId}`);
  }

  updateProfile(userId: string, profileData: any): Observable<any> {
    return this.http.put(`http://127.0.0.1:8000/api/profile/${userId}`, profileData);
  }
  
}
