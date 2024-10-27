import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://127.0.0.1:8000/api/users'; 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, userData);
  }

  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${userId}`, userData);     
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${userId}`);
  }
}
