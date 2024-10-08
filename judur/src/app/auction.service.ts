// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuctionService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  private apiUrl = 'http://localhost:8000/api/auctions'; // رابط الـ API من Laravel

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token'); // Ensure this returns the token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
  
  // لجلب كل المزادات
  getAuctions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // لجلب مزاد واحد
  getAuctionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // لإنشاء مزاد جديد
  createAuction(auctionData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, auctionData);
  }

  // لتعديل مزاد
  updateAuction(id: number, auctionData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, auctionData);
  }

  // لحذف مزاد
  deleteAuction(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  fetchCsrfToken(): Observable<any> {
    return this.http.get('http://localhost:8000/sanctum/csrf-cookie');
  }
  placeBid(auctionId: number, bidAmount: number): Observable<any> {
    const body = { bid_amount: bidAmount };
    const headers = this.getHeaders(); // Make sure the headers contain the token
    return this.http.post<any>(`${this.apiUrl}/${auctionId}/bid`, body, { headers });
  }
  
  getOngoingAuctions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
