import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private apiUrl = 'http://localhost:8000/api/auctions'; // API URL from Laravel
  private csrfUrl = 'http://localhost:8000/sanctum/csrf-cookie'; // URL to fetch CSRF token

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token'); // Ensure this returns the token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Fetch ongoing auctions
  getOngoingAuctions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?auction_status_id=2&end_date=>${new Date().toISOString()}`);
  }

  // Fetch all auctions
  getAuctions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Fetch a single auction by ID
  getAuctionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create a new auction
  createAuction(auctionData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, auctionData);
  }

  // Update an auction
  updateAuction(id: number, auctionData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, auctionData);
  }

  // Delete an auction
  deleteAuction(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Place a bid on an auction
  placeBid(auctionId: number, bidAmount: number): Observable<any> {
    const body = { bid_amount: bidAmount };
    const headers = this.getHeaders(); // Ensure the headers contain the token
    return this.http.post<any>(`${this.apiUrl}/${auctionId}/bid`, body, { headers });
  }

  // Fetch CSRF token
  fetchCsrfToken(): Observable<any> {
    return this.http.get(this.csrfUrl);
  }
}
