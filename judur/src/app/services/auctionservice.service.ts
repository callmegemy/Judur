import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionserviceService {

  private apiUrl = 'http://localhost:8000/api/completed-auctions';

  constructor(private http: HttpClient) {}

  // Get the token from localStorage or sessionStorage
  private getToken(): string | null {
    return localStorage.getItem('auth_token'); // Assuming the token is stored in localStorage
  }

  // Include the token in the Authorization header
  getCompletedAuctions(): Observable<any> {
    const token = this.getToken();

    // Ensure the token exists
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
